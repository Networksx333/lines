import React, { useState } from "react";
import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Modal, Typography} from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize} from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import {Button as BaseButton} from '@mui/material';


const Button = styled(BaseButton)(
  ({theme}) => `
  background-color: rgba(255, 255, 255, 0.5);
  margin: 10px;
  `,
);

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 80%;
  font-family: Roboto;
  font-size: 1.275rem;
  font-weight: 400;
  line-height: 1;
  padding: 42px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


const App = () => {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState(0);
  const [instructionModalOpen, setInstructionModalOpen] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  
  const handleTextPaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    setText(pastedText);
    event.preventDefault(); // Отменяем стандартное вставление текста без переносов строк
  };

  const handleStartButtonClick = () => {
    setScreen(1);
  };

  const handleScreenChange = () => {
    setScreen((prevScreen) => (prevScreen === 1 ? 2 : 1));
  };

  const handleBackButtonClick = () => {
    setScreen(0);
  };

  const handleInstructionModalOpen = () => {
    setInstructionModalOpen(true);
  };

  const handleInstructionModalClose = () => {
    setInstructionModalOpen(false);
  };


  return (
    <div className="app">
      {screen === 0 && (
        <>
          <TextareaAutosize minRows={20} value={text} onChange={handleTextChange} 
          className="text-area" minLength={200} onPaste={handleTextPaste}/>
          <Button onClick={handleStartButtonClick}>Старт</Button>
        </>
      )}
      {screen !== 0 && (
        <>
          <Button onClick={handleScreenChange}>Я помню всё</Button>
          {screen === 1 ? (
            <FullTextScreen text={text} />
          ) : (
            <AbbreviatedTextScreen text={text} />
          )}
        </>
      )}
      {screen !== 0 && (
        <div className="footer"><Button onClick={handleBackButtonClick} className="back-Button">
        Запомнить новый текст
      </Button>
      <Button onClick={handleInstructionModalOpen}>Инструкция</Button></div>
        
      )}
      
      
      

      <Modal
        open={instructionModalOpen}
        onClose={handleInstructionModalClose}
        className="modal"
      >
        <div className="modal-content">
          <Typography style={{ whiteSpace: "pre-line" }} variant="h7" gutterBottom>
            Приветствуем в приложении Lines!
            Уж так сложилось, что всё в этой жизни нужно автоматизировать. Запоминание тоже.
            Алгоритм следующий: <br/>
            1. Прочитай текст, который хочешь выучить <br/>
            2. Нажми на кнопку "Я помню всё" <br/>
            3. Снова прочитай текст, только теперь в твоём распоряжении только первые буквы каждого слова <br/>
            4. Не получилось? Вернись к пункту 2 <br/>
            5. Поздравляю, теперь можешь текст рассказать <br/>
          </Typography>
          <Button
            onClick={handleInstructionModalClose}
          >
            Всё прекрасно
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const FullTextScreen = ({ text }) => {
  return <div className="back"><Typography style={{ whiteSpace: "pre-line" }} variant="h6">{text}</Typography></div>;
};

const AbbreviatedTextScreen = ({ text }) => {
  let abbreviatedText = "";
  let prevCharIsWord = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (/[a-zA-Zа-яА-Я]/.test(char)) {
      // Если текущий символ - буква, добавляем ее в результат только если предыдущий символ не был буквой
      if (!prevCharIsWord) {
        abbreviatedText += char;
      }
      prevCharIsWord = true;
    } else {
      // Если текущий символ - не буква, добавляем его в результат и устанавливаем флаг prevCharIsWord в false
      abbreviatedText += char;
      prevCharIsWord = false;
    }
  }

  return <div className="back"><Typography style={{ whiteSpace: "pre-line" }} variant="h6">{abbreviatedText}</Typography></div>;
};




export default App;