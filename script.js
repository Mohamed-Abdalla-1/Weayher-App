window.addEventListener("load", () => {
  let long;
  let lat;
  let tempratureDegree = document.querySelector(".temprature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempratureDescription = document.querySelector(".temprature-description");
  let weatherIcon = document.querySelector(".icon");
  let tempratureSection = document.querySelector(".degree-section");
  let tempratureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const apiKey = `591e3fc3d2053500c48f2379d790ada6`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //   console.log(data);

          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          fTemp = Math.floor(((temp - 273.15) * 9) / 5 + 32);
          let cTemp = Math.floor((fTemp - 32) * (5 / 9));

          /////

          tempratureDegree.textContent = fTemp;
          tempratureDescription.textContent = description;
          locationTimezone.textContent = data.name;
          //   setIcons(main, document.querySelector(".icon"));
          weatherIcon.src = ` http://openweathermap.org/img/wn/${icon}@2x.png`;

          tempratureSection.addEventListener("click", () => {
            if (tempratureSpan.textContent === "F") {
              tempratureSpan.textContent = "C";
              tempratureDegree.textContent = cTemp;
            } else {
              tempratureSpan.textContent = "F";
              tempratureDegree.textContent = fTemp;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = "SANDY".toUpperCase();
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
