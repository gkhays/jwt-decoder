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

  for (var key in token) {
    if (key == "name") {
      var div = $('<div class="line1"></div>');
      var span = $('<span class="highlight-green"></span>');
      console.log("Analyzing line: " + token[key]);
      span.text(key + ": " + token[key]);
      div.append(span);
      jwtLines.append(div);
    } else if (key == "email") {
      var div = $('<div class="line2"></div>');
      var span = $('<span class="highlight-blue"></span>');
      console.log("Analyzing line: " + token[key]);
      span.text(key + ": " + token[key]);
      div.append(span);
      jwtLines.append(div);
    }
  }

  nameBlock.addClass($("#out").attr("class"));
  nameBlock.attr("id", $("#out").attr("id"));
  $("#out").replaceWith(nameBlock);
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
