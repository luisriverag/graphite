import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadSharedDoc } from "../../actions/sharedDocs";
import { Editor } from "@tinymce/tinymce-react";

// const generateRandomAnimalName = require('random-animal-name-generator');
// const animalName = generateRandomAnimalName();

const SharedDoc = ({ loadSharedDoc, docs: { sharedDoc, loading } }) => {

  useEffect(() => {
    const token = window.location.href.split("link/")[1];
    loadSharedDoc(token);        
    //eslint-disable-next-line
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (sharedDoc) {
      const { content } = sharedDoc;
      setContent(content);
      setTitle(title);     
    }
    //eslint-disable-next-line
  }, [sharedDoc]);

  const handleEditorChange = (editor, content) => {};

  if (loading) {
    return <div>Loading...</div>;
  } else {    
    return (
      <div>
        <Editor
          apiKey={process.env.REACT_APP_TINY_MCE}
          initialValue={content}
          value={content}
          disabled={sharedDoc.readOnly}
          init={{
            branding: false,
            height: "100vh",
            plugins: [
              "advlist autolink lists link image charmap print preview anchor pagebreak searchreplace",
              "searchreplace visualblocks code fullscreen formatpainter spellchecker hr toc",
              "insertdatetime media table paste code help wordcount quickbars directionality",
            ],           
            menubar: 'file edit insert format tools',            
            toolbar:
              "undo redo | print | formatpainter | formatselect | fontselect | fontsizeselect | bold italic backcolor | forecolor | link | quickimage | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | spellchecker | ltr rtl | help",              
          }}
          onEditorChange={handleEditorChange}
        />        
      </div>
    );
  }
};

SharedDoc.propTypes = {
  docs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  docs: state.docs,
});

export default connect(mapStateToProps, { loadSharedDoc })(SharedDoc);