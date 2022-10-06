var strengthLabels=["Very Weak","Weak", "Medium", "Strong"]
$(document).ready(function(){
  // $("input[type='checkbox']").click(function(){
  //   updatePassword(this)
  // });
  updatePassword();
  $("#myRange").on('input',function(){
    updateLength(this.value)
    // updatePassword()
  });
  $("#copier").click(function(){
    copyToClipboard($("#password"))
  })
  $("#generate-btn").click(function(){
    updatePassword();
  });
});

function updateLength(value) {
  $("#pwd-length").text(value)
  console.log($("*"))

}
const strengths=[{"definition":"Very Week",}]

function updatePassword() {

  const lc = "abcdefghijklmnopqrstuvwxyz";
  const uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const n = "0123456789";
  const s = "!@#$%^&*()";
  let fulls = []
  numberOfOptions=0

  inputs = $("input[type='checkbox']")
  inputs.attr("disabled",false)
  inputs.each(function(idx) {
    let type = $(this).attr("id")
    if (this.checked) {
      if (type == "include_lowercase") {
        fulls.push(lc)
        numberOfOptions+=1
      } else if (type == "include_uppercase") {
        fulls.push(uc)
        numberOfOptions+=1
      } else if (type == "include_numbers") {
        fulls.push(n)
        numberOfOptions+=1
      } else if (type == "include_symbols") {
        fulls.push(s)
        numberOfOptions+=1
      }
    }
  })
  if (numberOfOptions==1){
    inputs.each(function(idx) {
      if (this.checked) {
        $(this).attr("disabled",true)
      }
    })
  }
  console.log(numberOfOptions)

  lengthOfPassword=$("#pwd-length").text()
  newPassword=calculatePassword(lengthOfPassword,fulls)
  $("#password").text(newPassword)

  // Strength for each additional option selected
  strength=parseInt(numberOfOptions/2-1)
  // Strength divided in 3 for length
  strength+=parseInt(lengthOfPassword/7)

  displayStrength(strength)

  console.log("Strength",strength)
  console.log("Final String", fulls,lengthOfPassword)
}


function calculatePassword(length, clist){
  let result=""
  let characters=clist.join("")
  // Pick at least one from each clist element
  let i=0
  for (i=0; i<clist.length; i++){
    result += clist[i].charAt(Math.floor(Math.random() * clist[i].length));
  }
  for (; i<length; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  result.shuffle()
  console.log(length, characters)
  return result
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function displayStrength(strength){
  let strLabel=$("#meter-label")
  let strboxes=$(".strength-box")
  strLabel.text(strengthLabels[strength])
  let i=0;
  strboxes.removeClass (function (index, className) {
    return (className.match (/(^|\s)str-\d+/g) || []).join(' ');
  });
  strboxes.removeClass ("no-border");
  for (i=0;i<=strength;i++){
    $(strboxes[i]).addClass('str-'+strength)
    $(strboxes[i]).addClass('no-border')
  }
}
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
