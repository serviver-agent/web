window.onload = function() {
  const dvd = document.getElementById("access-counter");

  function showCounter(num, length) {
    const numstr = (num + '').padStart(length, '0');
    var html = "";
    numstr.split("").forEach(n => {
      html += "<img src=\"img/e" + n + ".gif\">";
    });
    dvd.innerHTML = html;
  }

  const count = 4200; // TODO API TATAKU

  showCounter(count, 8);

}
