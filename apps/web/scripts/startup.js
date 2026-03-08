document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("how_to_play").addEventListener("click", () => {


    document.getElementById("content_section").innerHTML = "Listen to the melody first and feel free to pause or reduce the tempo. Then try to reproduce the melody on the keyboard. You pass to the next level with the melody is complete within the allowed timeframe."

  });

  document.getElementById("about").addEventListener("click", () => {


    document.getElementById("content_section").innerHTML = 'This game is developed by Yacine Berrada as part of the IronHach curriculum. Feel free to share. You can follow me on github <a href="http://www.github.com/yacinebe"> here <a>'

  });

});