import { postQuickApplication } from "../API/api";
/**
 * Creates a quick application form
 * and listens to submit event
 * posts data to api
 * and shows success message
 * @param {*} mailAddressToWorkplace
 * @param {*} jobTitle
 * @param {*} jobUrl
 */
export async function initQuickJobApplicationForm(
  mailAddressToWorkplace,
  jobTitle,
  jobUrl
) {
  // create form element
  let wrapper = document.createElement("section");
  wrapper.classList.add("quick-job-container");
  wrapper.innerHTML = `
      <section class="quick-job-container">
          <div class="quick-job-content">
            <h4>Nysgjerrig på jobben, og vil bli kontaktet? 💖</h4>
            <p>Bare skriv inn e-postadressen din under, så hører du fra oss. </p>
            <form id="quick-job-form">
              <div class="form-row">
                <label for="email">E-postadresse</label>
                <input id="email" type="text">
              </div>
              <div class="form-row">
                <button type="submit" class="button"><span class="description">Send</span> <span class="rocket"><span>🚀</span></span></button>
              </div>
            </form>
          </div>
        
      </section>
    `;
  // add form element to page
  document.querySelector(".body-copy").append(wrapper);

  // listen to submit event
  wrapper
    .querySelector("#quick-job-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      let email = wrapper.querySelector("#email").value;
      // user must enter an e-mail address
      // should be validated in html
      if (!email.length) {
        alert("Du glemte å fylle ut e-postadresse i søknadsskjemaet. 😉");
      } else {
        // add loading spinner while waiting for api response
        wrapper.querySelector(".rocket").classList.add("spin");
        // post data to api
        await postQuickApplication({
          from: "jobb@kode24.no",
          to: mailAddressToWorkplace,
          applicant: email,
          jobUrl: "https://www.kode24.no" + jobUrl,
          jobTitle: jobTitle,
        });
        // update page after success
        // should probably be updated with failure function as well
        wrapper.querySelector(".rocket").classList.remove("spin");
        wrapper.querySelector(".rocket").classList.add("shoot");
        wrapper.querySelector("button").classList.add("submitted");
        wrapper.querySelector("button .description").innerHTML = "Takk!";
      }
    });
}
