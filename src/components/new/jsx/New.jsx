import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/new.css';
import '../css/quill-custom.css';
import { useNavigate } from 'react-router-dom';
import { app, auth } from '../../../services/Firebase';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';

const New = () => {
  const [content, setContent] = useState('');
  const [boxVisible, setBoxVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const boxRef = useRef(null);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const navigate = useNavigate();

  const handleChange = (value) => {
    setContent(value);
  };

  const handleClose = () => {
    setBoxVisible(false);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    Swal.fire("Зображення було завантажено", "", "success");
    document.getElementById("custom-file-upload-id").style.borderColor="#4cd137";
  };

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!title) {
      Swal.fire('Будь ласка, введіть заголовок новини');
      return;
    }

    if (!content) {
      Swal.fire('Будь ласка, додайте текст новини');
      return;
    }

    if (!category) {
      Swal.fire('Будь ласка, оберіть категорію новини');
      return;
    }

    if (!imageFile) {
      Swal.fire('Будь ласка, завантажте зображення для картки новини');
      return;
    } 

    if (user) {
      try {
        if (category) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const author = userDocSnap.exists() ? userDocSnap.data()?.username || 'Anonymous' : 'Anonymous';

          let imageUrl = "";
          if (imageFile) {
            const imageRef = ref(storage, `articles/${user.uid}/${imageFile.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            uploadTask.on(
              "state_changed",
              (snapshot) => { },
              (error) => {
                console.log(error);
              },
              async () => {
                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

                const newArticle = {
                  title,
                  category,
                  author,
                  rating: 0,
                  views: 0,
                  comments: 0,
                  content,
                  publishTime: serverTimestamp(),
                  preview: imageUrl,
                };

                const articleDocRef = await addDoc(collection(db, 'articles'), newArticle);

                // Update the image name in Firebase Storage to match the news ID
                if (imageFile) {
                  const imageRef = ref(storage, `articles/${user.uid}/${imageFile.name}`);
                  await deleteObject(imageRef);
                  const newImageRef = ref(storage, `articles/${articleDocRef.id}/${imageFile.name}`);
                  await uploadBytesResumable(newImageRef, imageFile);
                  const newImageUrl = await getDownloadURL(newImageRef);
                  await updateDoc(articleDocRef, { preview: newImageUrl });
                }

                handleClose();
                navigate('/');
              }
            );
          } else {
            const newArticle = {
              title,
              category,
              author,
              rating: 0,
              views: 0,
              comments: 0,
              content,
              publishTime: serverTimestamp(),
              preview: "",
            };

            const articleDocRef = await addDoc(collection(db, 'articles'), newArticle);

            handleClose();
            
            navigate('/');
          }
        } else {
          alert("Введіть категорію");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('User is not logged in');
    }
  };

  useEffect(() => {
    if (boxVisible && boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [boxVisible]);

  const quillModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  const handleContent = () => {
    document.getElementById("editor-quill-id").style.display = "block";
    document.getElementById("editor-settings-id").style.display = "none";
    document.getElementById("editor-switch-button-content").style.borderColor = "black";
    document.getElementById("editor-switch-button-settings").style.borderColor = "transparent";
  }

  const handleSettings = () => {
    document.getElementById("editor-quill-id").style.display = "none";
    document.getElementById("editor-settings-id").style.display = "block";
    document.getElementById("editor-switch-button-content").style.borderColor = "transparent";
    document.getElementById("editor-switch-button-settings").style.borderColor = "black";
  }

  return (
    <div className='editor'>
      <div className='editor-switch'>
        <button onClick={handleContent} id='editor-switch-button-content'>Контент</button>
        <button onClick={handleSettings} id='editor-switch-button-settings'>Налаштування</button>
        <button onClick={handleSave} className='editor-switch-button-publish'>ОПУБЛІКУВАТИ</button>
      </div>
      <div className='editor-container'>
        <div className='editor-quill' id='editor-quill-id'>
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill value={content} onChange={handleChange} placeholder="Текст новини" formats={quillFormats} modules={quillModules} />
        </div>
        <div className='editor-settings' id='editor-settings-id'>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Категорія</option>
            <option value="Україна">Україна</option>
            <option value="Світ">Світ</option>
            <option value="Бізнес">Бізнес</option>
            <option value="Технології">Технології</option>
            <option value="Культура">Культура</option>
            <option value="Здоров'я">Здоров'я</option>
            <option value="Спорт">Спорт</option>
            <option value="Ігри">Ігри</option>
          </select>
          <div className='editor-media-title'>Обкладинка для новини</div>
          <label for="file" class="custom-file-upload" id='custom-file-upload-id'>
            <div class="icon">
              <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
            </div>
            <div class="text">
              <span>Завантаження зображення</span>
            </div>
            <input id="file" type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default New;
