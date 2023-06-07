import { Article } from '../types';
export default function ArticleTileSocial({
  Article,
}: {
  Article: Article;
}) {
  return (
    <div className="social-buttons">
      <div className="article-social-reactions article-social-item">
        <a
          href={`https://www.kode24.no/${Article.id}#hyvor-talk-view`}
          className="reaction-button reaction"
        >
          <span className="reaction-icons-summary" aria-hidden="true">
            <svg
              className="reaction-icon"
              aria-hidden="true"
              version="1.1"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m8.9076 24.063c-3.0087-2.2551-4.8837-4.5078-5.5353-6.6503-0.23393-0.7692-0.25503-0.9756-0.20551-2.0103 0.060371-1.2615 0.24493-1.9811 0.78482-3.06 0.68628-1.3716 1.4949-2.3862 3.8525-4.834 0.93972-0.97567 1.9538-2.0932 2.2536-2.4835 1.264-1.6457 1.5122-2.8786 0.88889-4.4156-0.1313-0.32372-0.16165-0.48978-0.082303-0.45021 1.1068 0.55195 2.6677 1.7286 3.4543 2.604 1.0706 1.1915 1.7387 2.4077 2.1514 3.9168 0.27885 1.0195 0.32289 3.0985 0.10073 4.7547-0.08025 0.59833-0.11869 1.1111-0.08541 1.1394 0.09897 0.08431 0.95396-0.46025 1.261-0.80318 0.45405-0.5071 0.77763-1.1991 0.90688-1.9394l0.11994-0.68696 0.43464 0.51244c1.7771 2.0952 2.5275 3.7112 2.6338 5.6718 0.07688 1.4175-0.16769 2.3734-0.95488 3.7322-0.79644 1.3748-1.6808 2.3808-3.3369 3.7961-1.3507 1.1542-2.5512 2.0758-2.5512 1.9584 0-0.02731 0.21827-0.25899 0.48504-0.51486 1.6288-1.5622 2.3811-3.2755 2.1317-4.8542-0.21436-1.3569-0.8239-2.4089-2.5132-4.3376-0.56873-0.64934-1.2229-1.5021-1.4538-1.8951-0.36572-0.62246-0.41978-0.79139-0.41978-1.3118 0-0.32855 0.05112-0.7222 0.11354-0.87481 0.20812-0.50858 0.04271-0.47973-0.72617 0.12669-1.9081 1.5049-2.6732 3.3654-2.4201 5.8849 0.061 0.60725 0.09392 1.1185 0.07318 1.1362-0.02078 0.01763-0.20369-0.11344-0.40654-0.29138-0.41483-0.36387-0.69273-0.96042-0.69832-1.4991l-0.00347-0.36115-0.25705 0.26608c-0.40247 0.41663-1.0465 1.5314-1.3065 2.2618-0.33072 0.9287-0.33212 2.1166-0.00347 2.9713 0.38404 0.99881 0.91714 1.7497 2.1568 3.0379 0.15257 0.15855 0.25969 0.2871 0.23804 0.28566-0.021643-1e-3 -0.50792-0.35377-1.0806-0.78299z"
                fill="#f60"
                strokeWidth=".096099"
              ></path>
            </svg>
            <svg
              className="reaction-icon"
              aria-hidden="true"
              version="1.1"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                transform="scale(-1,1)"
                cx="-12.5"
                cy="13.034"
                r="11.158"
                fill="#ffdd67"
                style={{ paintOrder: 'stroke fill markers' }}
              ></circle>
              <path
                d="m11.555 21.173c-1.6604-0.18498-3.0943-0.89429-4.0865-2.0214-0.93354-1.0605-1.3976-2.2744-1.3987-3.6589l-2.699e-4 -0.3294h12.861l-0.01561 0.49074c-0.02526 0.79391-0.15721 1.3845-0.46136 2.0651-0.58781 1.3152-1.6581 2.3525-3.0328 2.9394-0.6234 0.26611-1.4565 0.47232-2.1288 0.5269-0.45715 0.03711-1.35 0.03075-1.7372-0.01239z"
                fill="#664f27"
                strokeWidth=".02689"
              ></path>
              <path
                d="m17.736 17.455c0.20061-0.40006 0.4537-1.3521 0.39802-1.4972-0.01468-0.03825-0.55112-0.04227-5.6379-0.04227-4.8243 0-5.6237 0.0054-5.6363 0.03808-0.00804 0.02094 0.00571 0.16917 0.030553 0.3294 0.052168 0.33648 0.23015 0.90319 0.3723 1.1855l0.09814 0.19488h10.271z"
                fill="#fff"
                strokeWidth=".02689"
              ></path>
              <path
                d="m6.5509 12.953c-0.3686-0.23428-1.7468-1.1398-1.7884-1.1751-0.017598-0.014902-0.1435-0.10271-0.27979-0.19514-1.3016-0.8827-2.5346-1.8478-2.9721-2.3266-0.16074-0.17588-0.46787-0.57422-0.46787-0.60682 0-0.011023-0.037144-0.074879-0.082543-0.1419-0.5235-0.77286-0.81546-1.8512-0.73508-2.715 0.092649-0.9956 0.52282-1.8559 1.1527-2.3054 0.37691-0.26895 0.74496-0.39736 1.2588-0.43916 0.67625-0.055017 1.5214 0.29448 2.225 0.92009 0.12025 0.10692 0.23372 0.20334 0.25216 0.21425 0.021938 0.01299 0.080999-0.093401 0.171-0.30803 0.35223-0.84001 0.67727-1.3323 1.2655-1.9167 0.58536-0.58153 1.1938-0.91912 1.9761-1.0965 0.6297-0.14274 1.437 0.012947 2.02 0.38958 0.29779 0.19237 0.6621 0.55369 0.85969 0.85263 0.63995 0.9682 0.81951 2.0271 0.56661 3.3413-0.05049 0.26237-0.08802 0.40292-0.20539 0.76915-0.19314 0.60262-0.49126 1.1845-1.0008 1.9532-0.31138 0.4698-0.46782 0.68802-0.88823 1.239-0.43579 0.57111-1.5291 1.9028-1.868 2.2754-0.088283 0.09705-0.20548 0.22823-0.26044 0.29152-0.30632 0.35274-0.73125 0.82902-0.85184 0.95481-0.071748 0.07484-0.11131 0.09855-0.1216 0.07288-0.011497-0.0287-0.015807-0.0291-0.017543-0.0016-0.00362 0.05735-0.067721 0.04319-0.20795-0.04594z"
                fill="#f36766"
                strokeWidth=".029152"
              ></path>
              <path
                d="m18.449 12.953c0.3686-0.23428 1.7468-1.1398 1.7884-1.1751 0.0176-0.0149 0.1435-0.10271 0.27979-0.19514 1.3016-0.8827 2.5346-1.8478 2.9721-2.3266 0.16074-0.17588 0.46787-0.57422 0.46787-0.60682 0-0.011023 0.03714-0.074879 0.08254-0.1419 0.5235-0.77286 0.81546-1.8512 0.73508-2.715-0.092649-0.9956-0.52282-1.8559-1.1527-2.3054-0.37691-0.26895-0.74496-0.39736-1.2588-0.43916-0.67624-0.055017-1.5214 0.29448-2.225 0.92009-0.12025 0.10692-0.23372 0.20334-0.25216 0.21425-0.02194 0.01299-0.081-0.093401-0.171-0.30803-0.35223-0.84001-0.67727-1.3323-1.2655-1.9167-0.58536-0.58153-1.1938-0.91912-1.9761-1.0965-0.6297-0.14274-1.437 0.012947-2.02 0.38958-0.29779 0.19237-0.6621 0.55369-0.85969 0.85263-0.63995 0.9682-0.81951 2.0271-0.56661 3.3413 0.05049 0.26237 0.08802 0.40292 0.20539 0.76915 0.19314 0.60262 0.49126 1.1845 1.0008 1.9532 0.31138 0.4698 0.46782 0.68802 0.88823 1.239 0.43579 0.57111 1.5291 1.9028 1.868 2.2754 0.08828 0.09705 0.20548 0.22823 0.26044 0.29152 0.30632 0.35274 0.73124 0.82902 0.85184 0.95481 0.07175 0.07484 0.11131 0.09855 0.1216 0.07288 0.0115-0.0287 0.01581-0.0291 0.01754-0.0016 0.0036 0.05735 0.06772 0.04319 0.20795-0.04594z"
                fill="#f36766"
                strokeWidth=".029152"
              ></path>
            </svg>
            <svg
              className="reaction-icon"
              aria-hidden="true"
              version="1.1"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="12.5"
                fill="#ffdd67"
                fillRule="evenodd"
                style={{ paintOrder: 'stroke fill markers' }}
              ></circle>
              <g
                transform="matrix(2.746,0,0,2.746,-21.825,-22.932)"
                fill="#664f27"
                strokeWidth=".0084262"
              >
                <path d="m13.155 11.762c-0.03827-0.01138-0.09277-0.06214-0.10825-0.10082-0.01351-0.03376-0.01331-0.03512 0.01698-0.11605 0.04265-0.11399 0.12558-0.29327 0.1828-0.3952 0.2872-0.51164 0.64228-0.77767 1.0125-0.75856 0.3804 0.01964 0.73238 0.32783 1.0028 0.87806 0.09196 0.18713 0.14754 0.32347 0.14754 0.36195 0 0.07071-0.11056 0.15462-0.17261 0.13103-0.01285-0.0048-0.05958-0.04315-0.10385-0.08505-0.09003-0.08521-0.22002-0.17594-0.32449-0.22651-0.42793-0.20713-0.95504-0.16791-1.3371 0.0995-0.0394 0.02758-0.11214 0.08643-0.16167 0.13078-0.04952 0.04435-0.09882 0.0824-0.10954 0.08456-0.01072 0.0021-0.03103 4.49e-4 -0.04511-0.0037z"></path>
                <path d="m9.6747 11.75c-0.023715-0.01104-0.053282-0.0334-0.065705-0.04969-0.038172-0.05005-0.037121-0.07541 0.0078-0.18813 0.13784-0.34587 0.31098-0.62519 0.50862-0.8205 0.11051-0.10921 0.19116-0.16808 0.30585-0.22328 0.12147-0.05846 0.19136-0.0743 0.33141-0.07512 0.09811-5.6e-4 0.13002 0.0026 0.18959 0.01867 0.37326 0.10085 0.72073 0.49896 0.96084 1.1009 0.04141 0.1038 0.04303 0.1108 0.03336 0.14325-0.02016 0.06758-0.11042 0.12619-0.16334 0.10607-0.01202-0.0045-0.06263-0.04479-0.11247-0.08937-0.18879-0.16888-0.39025-0.27563-0.60884-0.32262-0.44979-0.09668-0.9001 0.02892-1.2218 0.34079-0.0543 0.05264-0.093828 0.07954-0.11641 0.07922-0.00318-4.3e-5 -0.025173-0.0091-0.048888-0.02015z"></path>
              </g>
              <rect
                x="6.0548"
                y="12.999"
                width="12.442"
                height="2.6146"
                fill="#fff"
                strokeWidth="0"
                style={{ paintOrder: 'stroke fill markers' }}
              ></rect>
              <g
                transform="matrix(1.9589 0 0 1.9589 -11.984 -10.815)"
                fill="#664f27"
                strokeWidth=".010602"
              >
                <path d="m10.028 12.374c0.0043-0.02478 0.01813-0.11186 0.03079-0.1935l0.02303-0.14844h4.8425l0.02303 0.14844c0.01266 0.08164 0.02653 0.16871 0.03079 0.1935l0.0078 0.04506h-4.9657z"></path>
                <path d="m12.148 15.986c-0.02332-0.0022-0.09728-0.0091-0.16434-0.01534-0.82743-0.07649-1.5524-0.35364-2.1311-0.81466-0.19631-0.1564-0.44954-0.42614-0.60202-0.6413l-0.044125-0.06225 0.047418-0.06497c0.1907-0.26129 0.37705-0.63051 0.50906-1.0086l0.055532-0.15904h5.3697l0.04005 0.11815c0.13177 0.38869 0.3277 0.78089 0.52433 1.0496l0.04761 0.06505-0.0595 0.08339c-0.52594 0.73725-1.3905 1.2375-2.4157 1.3976-0.26493 0.04137-0.39426 0.05043-0.76338 0.05347-0.2041 0.0016-0.39017 0.0013-0.4135-9.94e-4z"></path>
              </g>
              <path
                d="m13.051 20.214c0.86077-0.0575 1.547-0.19348 2.3393-0.46357 0.51092-0.17415 0.49588-0.15443 0.2177-0.28529-0.59164-0.27829-1.317-0.47244-2.1405-0.57291-0.38937-0.0475-1.6277-0.04017-2.013 0.01208-0.83066 0.11228-1.5848 0.32492-2.1336 0.60158l-0.15273 0.077 0.18291 0.07675c1.0386 0.43573 2.4075 0.6409 3.7 0.55454z"
                fill="#f36766"
                strokeWidth=".023138"
              ></path>
              <path
                d="m6.7246 17.002c-0.76337 1.1129-2.5162 1.2374-3.9148 0.27798-1.3987-0.9594-1.9137-2.6393-1.1504-3.7522 0.76337-1.1129 4.1245-3.5822 5.5232-2.6229 1.3987 0.9594 0.30535 4.9842-0.45802 6.0971z"
                fill="#64b4f3"
                strokeWidth="0"
                style={{ paintOrder: 'stroke fill markers' }}
              ></path>
              <path
                d="m18.372 17.002c0.76337 1.1129 2.5162 1.2374 3.9148 0.27798 1.3987-0.9594 1.9137-2.6393 1.1504-3.7522-0.76337-1.1129-4.1245-3.5822-5.5232-2.6229-1.3987 0.9594-0.30535 4.9842 0.45802 6.0971z"
                fill="#64b4f3"
                strokeWidth="0"
                style={{ paintOrder: 'stroke fill markers' }}
              ></path>
            </svg>
          </span>
          <span className="reaction-count">
            {Article.reactions.reactions_count}
          </span>
        </a>
      </div>

      <div className="article-social-reactions article-social-item">
        <a
          href="https://www.kode24.no/79222223#hyvor-talk-view"
          className="reaction-button reaction"
        >
          <span className="reaction-icons-summary" aria-hidden="true">
            <svg
              className="reaction-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          <span className="reaction-count">
            {Article.reactions.comments_count}
          </span>
        </a>
      </div>
    </div>
  );
}
