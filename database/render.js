function text(key, value) {
  $(key).text(value);
}

function attr(key, value) {
  $(key).attr(value);
}

function html(key, value) {
  $(key).html(value);
}

function assets(path, file) {
  return db.github.raw + path + file;
}

$(function () {
  text("company", db.company);
  text("fullname", db.firstname + " " + db.lastname);
  text("copyright", db.copyright);
  text("firstname", db.firstname);
  text("city", db.city);
  text("experience", db.experience);
  text("age", db.age);
  text("country", db.country);
  text("mail", db.mail);
  attr("[href='mailto']", {
    href: "mailto:" + db.mail,
  });
  text("phone", db.phone);
  attr("[href='phone']", {
    href: "tel:" + db.phone,
  });
  text("whatsapp", db.phone);
  attr("[href='whatsapp']", {
    href: db.whatsapp,
  });
  attr("[href='location']", {
    href: db.location,
  });
  text("complete", db.complete);
  text("client", db.client);
});
(function () {
  var htmls = "<ul>";
  function serial(num, index) {
    if (num.toString().length == 1) {
      return "0" + index;
    } else {
      var prefix = "";
      while (prefix.length < num.toString().length - index.toString().length) {
        prefix += "0";
      }
      return prefix + index;
    }
  }

  $.each(db.services, function (index, item) {
    index = serial(db.services.length, index + 1);
    htmls += `
      <li>
        <img class="popup_image" src="${item.poster}" alt />
        <div class="list_inner">
          <div class="details">
            <div class="title">
              <span>${index}</span>
              <h3>${item.title}</h3>
            </div>
            <div class="text">
              <p>${item.short_description}</p>
            </div>
            <div class="cg_tm_read_more">
              <a href="#">Read More<span><img class="svg" src="assets/icons/more.svg" alt /></span></a>
            </div>
          </div>
          <a class="cg_tm_full_link" href="#"></a>
          <div class="hidden_details">
            <div class="descriptions">
              ${item.description}
            </div>
          </div>
        </div>
      </li>
      `;
  });

  htmls += "</ul>";

  html("services", htmls);
})();

(function () {
  var htmls = `<ul class="owl-carousel gallery_zoom">`;
  $.each(db.projects, function (y, project) {
    var dir = project.assets;
    htmls += `<li>
        <div class="list_inner">
          <div class="image">
            <img src="assets/img/popup.jpg" alt/>
            <div class="main" data-img-url="${assets(
              dir,
              project.poster
            )}"></div>
            <a class="cg_tm_full_link portfolio_popup" href="#"></a>
          </div>
          <div class="details">
            <span class="category">
              <a href="#">${project.category}</a>
            </span>
            <h3 class="title">
              <a class="line_effect portfolio_popup" href="#">${
                project.title
              }</a>
            </h3>
          </div>
        </div>
        
        <div class="hidden_content_portfolio">
          <div class="popup_details">
            <div class="main_details">
              <div class="textbox">
                ${project.description}
              </div>
              <div class="detailbox">
                <ul>
                  <li>
                    <span class="first">Client</span>
                    <span>${project.client}</span>
                  </li>
                  <li>
                    <span class="first">Category</span>
                    <span>
                      <a href="#">${project.category}</a>
                    </span>
                  </li>
                  <li>
                    <span class="first">Date</span>
                    <span>${project.date.start} \n ${project.date.end}</span>
                  </li>
                  <li>
                    <span class="first">Share</span>
                    <ul class="share">
                      <li><a href="${
                        db.accounts.facebook
                      }"><img class="svg" src="assets/icons/facebook.svg" alt /></a></li>
                      <li><a href="${
                        db.accounts.twitter
                      }"><img class="svg" src="assets/icons/twitter.svg" alt /></a></li>
                      <li><a href="${
                        db.accounts.instagram
                      }"><img class="svg" src="assets/icons/instagram.svg" alt /></a></li>
                    </ul>
                  </li>
                   <li>
                    <span class="first">Download</span>
                    <span>
                      <a href="${
                        db.github.repository + project.download
                      }"><img class="svg" src="assets/icons/github.svg" alt /></a></a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="additional_images">
              <ul>`;
    $.each(project.screens, function (x, screen) {
      htmls += `
                <li>
                  <div class="list_inner">
                    <div class="my_image">
                      <img src="${assets(dir, screen)}" alt />
                    </div>
                  </div>
                </li>`;
    });

    htmls += ` </ul>
            </div>
          </div>
        </div>
      </li>`;
  });
  htmls += "</ul>";
  html("portfolio", htmls);
})();

(function () {
  var htmls = ``;
  $.each(db.skills, function (a, b) {
    htmls += `<article class="timeline__item"><h5 class="title title--h5 timeline__title">${b.title}</h5><div class="row">`;
    $.each(b.feature, function (c, d) {
      htmls += `<div class="col"><div class="timeline2 p-4 block mb-4">`;
      $.each(d, function (e, f) {
        if (e == 0) {
          htmls += `<div class="tl-item"><div class="tl-dot b-primary"></div><div class="tl-content"><div class="fs-3 fw-bolder">${f}</div></div></div>`;
        } else {
          htmls += `<div class="tl-item"><div class="tl-dot b-success"></div><div class="tl-content"><div class="">${f}</div></div></div>`;
        }
      });
      htmls += `</div></div>`;
    });
    htmls += `</div></article>`;
  });

  html("skills", htmls);
})();

(function () {
  var htmls = ``;

  $.each(db.education, function (index, item) {
    htmls += `
      <article class="timeline__item">
        <h5 class="title title--h5 timeline__title">${item.level} | ${item.field}</h5>
        <span class="timeline__period">${item.from} — ${item.to}</span>
        <p class="timeline__description">${item.school}</p>
      </article>
      `;
  });

  html("education", htmls);
})();

(function () {
  var htmls = ``;

  $.each(db.experiences, function (index, item) {
    htmls += `
      <article class="timeline__item">
        <h5 class="title title--h5 timeline__title">${item.company} | ${item.location} </h5>
        <h6 class="title title--h5 timeline__title">${item.title}</h6>
        <span class="timeline__period">${item.from} — ${item.to}</span>
        <p class="timeline__description">${item.description}</p>
      </article>
      `;
  });

  html("experiences", htmls);
})();
