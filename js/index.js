function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function analyzeJWT(token) {
  var nameBlock = $("<pre></pre>");
  var jwtLines = $('<div class="thin-border"></div>');
  nameBlock.append(jwtLines);

  let div;
  let span;

  for (var key in token) {
    switch (key) {
      case "name":
        div = $('<div class="line1"></div>');
        span = $('<span class="highlight-green"></span>');
        console.log("Analyzing line: " + token[key]);
        span.text(key + ": " + token[key]);
        div.append(span);
        jwtLines.append(div);
        break;
      case "email":
        div = $('<div class="line2"></div>');
        span = $('<span class="highlight-blue"></span>');
        console.log("Analyzing line: " + token[key]);
        span.text(key + ": " + token[key]);
        div.append(span);
        jwtLines.append(div);
        break;
      case "exp":
        div = $('<div class="line3"></div>');
        span = $('<span class="highlight-yellow"></span>');
        console.log("Analyzing line: " + token[key]);
        span.text("Expires: " + timeConverter(token[key]));
        div.append(span);
        jwtLines.append(div);
        break;
      case "nbf":
        div = $('<div class="line4"></div>');
        span = $('<span class="highlight-yellow"></span>');
        console.log("Analyzing line: " + token[key]);
        span.text("Not Before: " + timeConverter(token[key]));
        div.append(span);
        jwtLines.append(div);
        break;
      case "iat":
        div = $('<div class="line5"></div>');
        span = $('<span class="highlight-yellow"></span>');
        console.log("Analyzing line: " + token[key]);
        span.text("Issued At: " + timeConverter(token[key]));
        div.append(span);
        jwtLines.append(div);
        break;
      default:
        console.log("out of keys");
    }
  }

  nameBlock.addClass($("#out").attr("class"));
  nameBlock.attr("id", $("#out").attr("id"));
  $("#out").replaceWith(nameBlock);
}

function timeConverter(timestamp) {
  return new Date(timestamp * 1000);
}

$(document).ready(function () {
  $("#decode").click(function () {
    console.log("Clicked on convert button...");

    token = $("#token").val();
    const decoded = decodeJWT(token);
    console.log(decoded);
    $("#decoded").val(JSON.stringify(decoded, null, 2));

    analyzeJWT(decoded);
  });
});
