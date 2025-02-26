import{T as g,u as y}from"./useApi-BPfDY8dj.js";import{s as oe}from"./auth-CIdfLHBs.js";function Z(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function G(){for(let e=1;e<=4;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;S(e)});document.querySelector("#V-monitoring").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;S(e)});function S(e){G(),Z(),K(),document.querySelector(".menus"+e).classList.add("activeMenu")}function K(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;A(e)});function A(e){G(),Z(),K(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let k=!1,ce=document.getElementById("showPasswordAddUser");ce.addEventListener("click",function(){me()});function me(){k?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",k=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",k=!0)}let q=!1,ue=document.getElementById("showPasswordEditUser");ue.addEventListener("click",function(){ve()});function ve(){q?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",q=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",q=!0)}let C=!1,ge=document.getElementById("showPasswordShowConfig");ge.addEventListener("click",function(){ye()});function ye(){C?(document.getElementById("passwordShowConfig").type="password",C=!1):(document.getElementById("passwordShowConfig").type="text",C=!0)}let P=!1,pe=document.getElementById("showPasswordDeletServer");pe.addEventListener("click",function(){he()});function he(){P?(document.getElementById("passwordDeletServer").type="password",P=!1):(document.getElementById("passwordDeletServer").type="text",P=!0)}let fe=document.getElementById("addUserModal");fe.addEventListener("click",function(){D()});let we=document.getElementById("addTableUsers");we.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,a=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?g({text:"نام کمتر از 3 کاراکتر می باشد."}).showToast():t.length<3?g({text:"نام خانوادگی کمتر از 3 کاراکتر می باشد."}).showToast():d.length<3?g({text:"نام کاربری کمتر از 3 کاراکتر می باشد."}).showToast():a.length<8?g({text:"رمز عبور کمتر از 8 کاراکتر می باشد."}).showToast():a!=n&&g({text:"رمز عبور با فیلد تکرار مطابقت ندارد."}).showToast(),e.length>=3&&t.length>=3&&d.length>=3&&a.length>=8&&n.length>=8&&a===n&&(Ie(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Ee=document.getElementById("canselAddTableUser");Ee.addEventListener("click",function(){D()});function D(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}async function Ie(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,a=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,l=document.getElementById("repeatPasswordAddUser").value;await y({method:"post",url:"add-member",data:{first_name:e,last_name:t,auth_name:d,role:a,password:n,password_confirmation:l},callback:function(s){let i=document.createElement("tr");i.setAttribute("id",`tr${s.data.user.id}`),f.push({id:s.data.user.id,name:s.data.user.first_name,family:s.data.user.last_name,authName:s.data.user.auth_name,role:s.data.role});for(let r=1;r<=6;r++){let o=document.createElement("td");if(o.setAttribute("class",`td${r}`),r==1)o.innerHTML=document.getElementById("nameInputAddUser").value;else if(r==2)o.innerHTML=document.getElementById("familyInputAddUser").value;else if(r==3)o.innerHTML=document.getElementById("authNameInputAddUser").value;else if(r==4){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,o.appendChild(c),s.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):s.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(r==5){let c=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${s.data.user.id}"
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          class="bi bi-pencil-square iconEditUser cursorPointer"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}else if(r==6){let c=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${s.data.user.id}"
          class="bi bi-trash3 removeUser cursorPointer" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}i.appendChild(o)}document.getElementById("tBody").appendChild(i),D(),ee(),Y()}}),document.getElementById("idLoading").style.display="none"}let be=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=be;let Se=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=Se;window.onload=function(){Te()};let V=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){X();const e=this.dataset.id;A(e),document.getElementById("idLoading").style.display="flex"});let f=[],Q;async function X(){await y({url:"show-all-users?paginate=30",callback:function(t){V&&(document.getElementById("tBody").innerHTML=""),V=!0;let d=t.data.data.length;for(let a=0;a<d;a++){let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.data[a].id}`),f.push({id:t.data.data[a].id,name:t.data.data[a].first_name,family:t.data.data[a].last_name,authName:t.data.data[a].auth_name,role:t.data.data[a].roles[0].name});for(let l=1;l<=6;l++){let s=document.createElement("td");if(s.setAttribute("class",`td${l}`),l==1)s.innerHTML=t.data.data[a].first_name;else if(l==2)s.innerHTML=t.data.data[a].last_name;else if(l==3)s.innerHTML=t.data.data[a].auth_name;else if(l==4){let i=document.createElement("span");i.innerHTML=t.data.data[a].roles[0].name,s.appendChild(i),t.data.data[a].roles[0].name=="admin"?i.setAttribute("class","badge text-bg-danger fs-5"):t.data.data[a].roles[0].name=="expert"?i.setAttribute("class","badge text-bg-primary fs-5"):t.data.data[a].roles[0].name=="visitor"&&i.setAttribute("class","badge text-bg-success fs-5")}else if(l==5){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${t.data.data[a].id}"
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          class="bi bi-pencil-square iconEditUser cursorPointer"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;s.insertAdjacentHTML("afterbegin",i)}else if(l==6){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          id="${t.data.data[a].id}"
          fill="currentColor"
          class="bi bi-trash3 removeUser cursorPointer"
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
        >
          <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>`;s.insertAdjacentHTML("afterbegin",i)}n.appendChild(s)}document.getElementById("tBody").appendChild(n)}e(t)}}),document.getElementById("idLoading").style.display="none";function e(t){let d=t.data.data.length,a=t.data.data;for(let n=0;n<d;n++)a[n].id}ee(),Y()}function Y(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let d=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=d.innerHTML,Q=t.id})})}let Le=document.getElementById("removeUserModalClick");Le.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",xe(Q)});let z;function ee(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",e.forEach(t=>{t.addEventListener("click",function(){z=t;let d=f.find(a=>a.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role)})})}let Be=document.getElementById("addEditUser");Be.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ae(z.id)});async function xe(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove()}}),document.getElementById("idLoading").style.display="none"}async function Ae(e){let t=Number(e),d=document.getElementById("nameInputEditUser").value,a=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,l=document.getElementById("selectEditUser").value,s=document.getElementById("passwordEditUser").value,i=document.getElementById("repeatPasswordEditUser").value;await y({method:"put",url:"reset-password-and-auth-name",data:{first_name:d,last_name:a,user_id:t,auth_name:n,role:l,password:s,password_confirmation:i},callback:function(r){let o=f.findIndex(B=>B.id==z.id);o!=-1&&(f[o].id=r.data.user.id,f[o].name=r.data.user.first_name,f[o].family=r.data.user.last_name,f[o].authName=r.data.user.auth_name,f[o].role=r.data.user.roles),document.querySelector(`#tr${e} .td1`).innerHTML=r.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=r.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=r.data.user.auth_name,document.querySelector(`#tr${e} .td4 span`).innerHTML=r.data.user.roles;let c=document.querySelector(`#tr${r.data.user.id} .td4 span`);c.innerHTML=="expert"?(c.classList.remove("text-bg-success"),c.classList.add("text-bg-primary")):c.innerHTML=="visitor"&&(c.classList.remove("text-bg-primary"),c.classList.add("text-bg-success")),g({text:"مشخصات کاربر با موفقیت بروزرسانی شد."}).showToast()}}),document.getElementById("idLoading").style.display="none"}let L,te;function Ue(e,t,d){const n=new Date().getTime()+d*24*60*60*1e3,l={value:t,expiry:n};localStorage.setItem(e,JSON.stringify(l))}function Me(e){const t=localStorage.getItem(e);if(!t)return null;const d=JSON.parse(t);return new Date().getTime()>d.expiry?(localStorage.removeItem(e),null):d.value}async function Te(){await y({url:"get-me",callback:function(n){oe(n.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(n){L=n.data,qe(L)}}),document.getElementById("idLoading").style.display="none",ze();const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let d;e.forEach(n=>{n.addEventListener("click",function(){d=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",$e(d)});const a=document.querySelectorAll(".editServer");ae(a)}function ae(e){e.forEach(t=>{t.addEventListener("click",function(){let d=L.find(l=>l.id==this.dataset.id);te=this.dataset.id;let a=d.name,n=d.ip;document.querySelector('input[name="nameEditNameServer"]').value=a,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function $e(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,d=document.querySelector('input[name="namePasswordShowConfig"]').value;console.log(e),localStorage.setItem("server",e),await y({method:"post",data:{server_id:e,username:t,password:d},url:"test-connection",callback:function(a){console.log(a),Ue("userData",{username:t,password:d},3),Me("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function He(e){let t=document.getElementById("editNameServer").value,d=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:d},callback:function(){let a=document.querySelector('input[name="nameEditNameServer"]').value,n=document.querySelector('input[name="nameEditIpServer"]').value;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=n,L[e-1].name=a}}),document.getElementById("idLoading").style.display="none"}let ke=document.getElementById("subServer");ke.addEventListener("click",function(){He(te)});let U,M,ne,x,N,I,W;function qe(e){let t=0;const d=document.querySelector("#cardContainer");e.forEach(a=>{I=document.createElement("div"),e[t].is_down==0?I.className="info-box host col-3 me-5":I.className="info-box off col-3 me-5",I.setAttribute("data-server-id",`${e[t].id}`),t++,I.innerHTML=`
  <h5 id="nameServer${a.id}">${a.name}</h5>
  <p id="ipServer${a.id}">${a.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${a.id}"
  type="button"
  data-bs-toggle="modal"
  data-bs-target="#staticBackdrop"
  >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    class="bi bi-pencil-square"
    viewBox="0 0 16 16"
  >
    <path
      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
    />
    <path
      fill-rule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
    />
  </svg>
  </div>
  <div class="d-flex justify-content-between">
  <div class="d-flex">
    <div
      class="divFlex divIconPause justify-content-center align-items-center"
      style="${e[t-1].is_down==1?"display:none":"display:flex"}"
      data-server-pause-id="${a.id}"
      id="iconPause${a.id}"
      data-bs-toggle="modal"
      data-bs-target="#stopServer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-pause-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"
        />
      </svg>
    </div>
    <div
      class="divFlex divIconPlay justify-content-center align-items-center"
      style="${e[t-1].is_down==0?"display:none":"display:flex"}"
      data-server-play-id="${a.id}"
      id="iconPlay${a.id}"
      data-bs-toggle="modal"
      data-bs-target="#playServer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
        />
      </svg>
    </div>
    <div
      class="divFlex divIconRemoveServer d-flex justify-content-center align-items-center me-2"
      data-server-trash-id="${a.id}"
      id="iconRemoveServer${a.id}"
      data-bs-toggle="modal"
      data-bs-target="#deletServer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg>
    </div>
  </div>
  <div>
    <div
      class="divFlex d-flex justify-content-center align-items-center Server ms-2 gearConfig"
      data-bs-toggle="modal"
      data-bs-target="#serverPassword"
      data-id="${a.id}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-gear-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
        />
      </svg>
    </div>
  </div>
  </div>
  `,d.appendChild(I)}),de(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ce(U)}),le(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Pe(M)}),se(),document.getElementById("subDeletServer").addEventListener("click",function(){let a=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;a.length<3?g({text:"نام کمتر از 3 کاراکتر می باشد."}).showToast():n.length<8&&g({text:"پسورد کمتر از 8 کاراکتر می باشد."}).showToast(),a.length>=3&&n.length>=8&&(Ne(ne),document.getElementById("idLoading").style.display="flex")}),_e(),re(),document.getElementById("subAddServer").addEventListener("click",function(){let a=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;a.length<3?g({text:"نام کمتر از 3 کاراکتر می باشد."}).showToast():n.length<7&&g({text:"IP کمتر از 7 کاراکتر می باشد."}).showToast(),a.length>=3&&n.length>=7&&(De(),document.getElementById("idLoading").style.display="flex")})}function de(){W=document.querySelectorAll(".divIconPause"),W.forEach(e=>{e.addEventListener("click",function(){x=e.id,U=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function le(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){N=t.id,M=this.dataset.serverPlayId;let d=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=d})})}function se(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){ne=this.dataset.serverTrashId;let d=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=d})})}async function Ce(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let d=t.msg;console.log(t.msg),console.log(x),document.getElementById(`${x}`).classList.remove("d-flex"),document.getElementById(`${x}`).classList.add("d-none"),document.getElementById(`iconPlay${U}`).classList.remove("d-none"),document.getElementById(`iconPlay${U}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),g({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Pe(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let d=t.msg;document.getElementById(`${N}`).classList.remove("d-flex"),document.getElementById(`${N}`).classList.add("d-none"),document.getElementById(`iconPause${M}`).classList.remove("d-none"),document.getElementById(`iconPause${M}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),g({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ne(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,username:t,password:d},callback:function(a){console.log(a.data.server);let n=a.msg;document.querySelector(`.info-box[data-server-id='${a.data.server.id}']`).remove(),g({text:n}).showToast()}}),document.getElementById("idLoading").style.display="none"}function _e(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function re(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value=""})}async function De(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:d},callback:function(n){L.push(n.data);const l=document.createElement("div");l.className="info-box host col-3 me-5",l.setAttribute("data-server-id",`${n.data.id}`),l.innerHTML=`
  <h5 id="nameServer${n.data.id}">${n.data.name}</h5>
  <p id="ipServer${n.data.id}">${n.data.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${n.data.id}"
  type="button"
  data-bs-toggle="modal"
  data-bs-target="#staticBackdrop"
  >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    class="bi bi-pencil-square"
    viewBox="0 0 16 16"
  >
    <path
      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
    />
    <path
      fill-rule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
    />
  </svg>
  </div>
  <div class="d-flex justify-content-between">
  <div class="d-flex">
    <div
      class="divFlex divIconPause d-flex justify-content-center align-items-center"
      data-server-pause-id="${n.data.id}"
      id="iconPause${n.data.id}"
      data-bs-toggle="modal"
      data-bs-target="#stopServer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-pause-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"
        />
      </svg>
    </div>
    <div
      class="divFlex divIconPlay justify-content-center align-items-center"
      style="display:none"
      data-server-play-id="${n.data.id}"
      id="iconPlay${n.data.id}"
      data-bs-toggle="modal"
      data-bs-target="#playServer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
        />
      </svg>
    </div>
    <div
      class="divFlex divIconRemoveServer d-flex justify-content-center align-items-center me-2"
      data-server-trash-id="${n.data.id}"
      id="iconRemoveServer${n.data.id}"
      data-bs-toggle="modal"
      data-bs-target="#deletServer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg>
    </div>
  </div>
  <div>
    <div
      class="divFlex d-flex justify-content-center align-items-center Server ms-2 gearConfig"
      data-bs-toggle="modal"
      data-bs-target="#serverPassword"
      data-id="${n.data.id}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-gear-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
        />
      </svg>
    </div>
  </div>
  </div>
  `,e.appendChild(l),re()}}),de(),le(),se();const a=document.querySelectorAll(".editServer");ae(a),document.getElementById("idLoading").style.display="none"}let J=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",F(1);const e=this.dataset.id;S(e)});let O;async function F(e=1){let t;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var i,r,o,c,B,R;J&&(document.getElementById("tBody2").innerHTML=""),J=!0;let a=Math.ceil(d.data.total/20),n;e==1,n=(e-1)*20,n++;let l=d.data.data.length;for(let u=0;u<l;u++){let m=document.createElement("tr");for(let v=1;v<=5;v++){let p=document.createElement("td");if(v==1)p.innerHTML=n++;else if(v==2){let h=document.createElement("span"),b=document.createElement("span");h.setAttribute("class","mx-2"),b.setAttribute("class","mx-2");let w=document.createElement("div");w.setAttribute("class","mt-2"),h.innerHTML=((r=(i=d.data.data[u].properties)==null?void 0:i.user)==null?void 0:r.first_name)||"-",b.innerHTML=((c=(o=d.data.data[u].properties)==null?void 0:o.user)==null?void 0:c.last_name)||"-",w.innerHTML=((R=(B=d.data.data[u].properties)==null?void 0:B.user)==null?void 0:R.auth_name)||"-",p.appendChild(h),p.appendChild(b),p.appendChild(w),w.classList.add("fontSize")}else if(v==3)p.innerHTML=d.data.data[u].event;else if(v==4)p.innerHTML=d.data.data[u].description;else if(v==5){let h=new Date(d.data.data[u].created_at).toLocaleString("fa-IR");p.innerHTML=h}m.appendChild(p)}document.getElementById("tBody2").appendChild(m)}t=a,s(t,O);function s(u,m=1){const v=document.getElementById("pagination");v.innerHTML="";const p=document.createElement("li");p.className=`page-item ${m===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">اولین صفحه</a>',v.appendChild(p);const h=document.createElement("li");h.className=`page-item ${m===1?"disabled":""}`,h.innerHTML=`<a class="page-link" href="#" data-page="${m-1}">صفحه قبلی</a>`,v.appendChild(h);const b=m===1?m:m-1,w=m===u?m:Math.min(m+1,u);for(let E=Math.max(1,b-1);E<=Math.min(u,w+1);E++){const H=document.createElement("li");H.className=`page-item ${E===m?"active":""}`,H.innerHTML=`<a class="page-link ${E===m?"active-page":""}" href="#" data-page="${E}">${E}</a>`,v.appendChild(H)}const T=document.createElement("li");T.className=`page-item ${m===u?"disabled":""}`,T.innerHTML=`<a class="page-link" href="#" data-page="${m+1}">صفحه بعدی</a>`,v.appendChild(T);const $=document.createElement("li");$.className=`page-item ${m===u?"disabled":""}`,$.innerHTML=`<a class="page-link" href="#" data-page="${u}">آخرین صفحه</a>`,v.appendChild($)}}}),document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(a){a.preventDefault();const n=parseInt(this.getAttribute("data-page"));!isNaN(n)&&n>0&&n<=t&&(document.getElementById("idLoading").style.display="flex",O=n,F(n),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})})}const j=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function _(){return window.location.hash||"#v-servers-home"}const ze=()=>{let e=_();document.querySelector(e)&&(ie(e),j(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{j(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){j(_()),ie(_())})});function ie(e){switch(document.querySelectorAll(".tab-pane").forEach(t=>{t.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),e){case"#v-servers-home":S(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":A(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":A(2),X(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":S(4),F(1),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}}
