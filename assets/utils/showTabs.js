export const showTabs = (updateUser = null) => {
      // TODO habilitar las tabs
    const tabList = document.querySelectorAll(".nav-tabs .nav-link");
     if (updateUser !== null) {
        for (let i = 1; i < tabList.length; i++) {
            tabList[i].classList.remove("disabled");
          }
     }else if (tabList[1].classList[1] == 'disabled') {
          for (let i = 1; i < tabList.length; i++) {
        tabList[i].classList.remove("disabled");
      }
      }
    
}