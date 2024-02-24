
// 判断用户名是否合规
const checkoutUser = (username, evt) => {
  const usernameRegex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
  if (evt != undefined) {
    const existingP = evt.target.nextElementSibling;
    // 检查是否存在已创建的<p>元素
    if (existingP && existingP.tagName === "P") {
      existingP.remove(); // 移除已存在的<p>元素
    }
    // 获取提示标签
    const p = document.createElement('p')
    evt.target.parentNode.insertBefore(p, evt.target.nextSibling);
    // 判断
    if (username == "") {
      p.textContent = "!用户名不能为空";
      return false;
    } else if (usernameRegex.test(username)) {
      p.style.display = "none";
      return true;
    } else {
      p.textContent = "!只包含字母、数字、中文";
      return false;
    }
  } else {
    if (username == "") {
      return false;
    } else if (usernameRegex.test(username)) {
      return true;
    } else {
      return false;
    }
  }
};

// 判断密码是否合规
const checkoutPw = (password, evt) => {
  const passwordRegex = /^[A-Za-z0-9@&#/]{6,12}$/;
  if (evt != undefined) {
    const existingP = evt.target.nextElementSibling;
    // 检查是否存在已创建的<p>元素
    if (existingP && existingP.tagName === "P") {
      existingP.remove(); // 移除已存在的<p>元素
    }
    // 获取提示标签
    const p = document.createElement('p')
    evt.target.parentNode.insertBefore(p, evt.target.nextSibling);
    // 判断
    if (password === "") {
      p.textContent = "!密码不能为空";
      return false;
    } else if (passwordRegex.test(password)) {
      p.style.display = "none";
      return true;
    } else {
      p.textContent = "!长度为6-12位,包含字母、数字、符号";
      return false;
    }
  } else {
    if (password === "") {
      return false;
    } else if (passwordRegex.test(password)) {
      return true;
    } else {
      return false;
    }
  }
};
// 确认密码
const checkEqual = (newpassword, repassword, evt) => {
  if (evt != undefined) {
    const existingP = evt.target.nextElementSibling;
    // 检查是否存在已创建的<p>元素
    if (existingP && existingP.tagName === "P") {
      existingP.remove(); // 移除已存在的<p>元素
    }
    // 获取提示标签
    const p = document.createElement('p')
    evt.target.parentNode.insertBefore(p, evt.target.nextSibling);
    if (repassword == newpassword) {
      p.style.display = "none";
      return true;
    } else {
      p.textContent = "！密码不一致，请检查";
      return false;
    }
  } else {
    if (repassword == newpassword) {
      return true;
    } else {
      return false;
    }
  }
};
export { checkoutUser, checkoutPw, checkEqual }