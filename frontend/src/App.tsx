import { ChangeEvent, useState } from "react";
import axiosApi from "./axiosApi";
import { apiURL } from "./assets/constants";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showText, setShowText] = useState(false);
  const [visibleShort, setVisibleShort] = useState("");

  const isValidUrl = (url: string) => {
    const pattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*)/gi;
    return pattern.test(url);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidUrl(inputValue)) {
      alert("Неверный URL! Необходимо ввести «http».");
      console.error("Неверный URL-адрес");
      return;
    }

    const data = {
      url: inputValue,
    };

    try {
      const response = await axiosApi.post("links", data);
      setShortUrl(response.data.shortUrl);
      setVisibleShort(apiURL + "/" + response.data.shortUrl);
    } catch (e) {
      console.error(e);
    }

    if (!showText) {
      setShowText(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="container w-50 text-center appMain">
        <h1>Сократить ссылку!</h1>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Введите ссылку"
            className="form-control mt-3"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-danger mt-3">
            Сократить!
          </button>
        </form>
        {showText && <h3>Ваша ссылка теперь выглядит так:</h3>}
        {shortUrl && (
          <a className="btn btn-primary" href={`${visibleShort}`}>
            {visibleShort}
          </a>
        )}
      </div>
    </>
  );
};

export default App;
