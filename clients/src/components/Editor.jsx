import React,{useState} from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Editorx() {
   
    const [userInfo, setuserInfo] = useState({
      title: '',
    });
    const onChangeValue = (e) => {
      setuserInfo({
        ...userInfo,
        [e.target.name]:e.target.value
      });
    } 
    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
      setDescription(editorState);
      console.log(editorState)
    }
    
    const addDetails = async (event) => {
        event.preventDefault()
        console.log(userInfo.title,userInfo.description.value)   
    } 
     
  return ( 
  <>
   <Editor
       editorState={description}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
       editorClassName="editorClassName"
    onEditorStateChange={onEditorStateChange}
                  />
               
             
  </>
  )
  }
  export default Editorx