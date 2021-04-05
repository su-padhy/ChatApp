import React, { Component } from 'react';
import Editor from '../../ckeditor5/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MUIRichTextEditor from "mui-rte";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const editorConfiguration = {
    toolbar: [ 'bold', 'italic','underline','Blockquote','link', 'numberedList', 'bulletedList','insertImage',"code",]
};
const save = (data) => {
    console.log(data);
  };

  const defaultTheme = createMuiTheme();

  Object.assign(defaultTheme, {
      overrides: {
          MUIRichTextEditor: {
              root: {
                  marginTop: 80,
                  width: "80%"
              },
              editor: {
                  borderBottom: "1px solid gray" 
              }
          }
      }
  })


class CitryEditor extends Component {

    
    render() {
        return (
            <div className="App">
             

             <MuiThemeProvider theme={defaultTheme}>
    <MUIRichTextEditor 
        label="Type something here..."
        inlineToolbar={true}
    />
</MuiThemeProvider>

            </div>
        );
    }
}

export default CitryEditor;