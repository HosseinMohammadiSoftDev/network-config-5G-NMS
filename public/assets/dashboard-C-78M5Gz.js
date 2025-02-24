import{T as y,u as v}from"./useApi-B2W-hXre.js";import{s as ye}from"./auth-CIdfLHBs.js";function Y(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function ee(){for(let e=1;e<=5;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e)});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e),ge()});function E(e){ee(),Y(),te(),document.querySelector(".menus"+e).classList.add("activeMenu")}function te(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;T(e)});function T(e){ee(),Y(),te(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let C=!1,he=document.getElementById("showPasswordAddUser");he.addEventListener("click",function(){fe()});function fe(){C?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",C=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",C=!0)}let q=!1,Ee=document.getElementById("showPasswordEditUser");Ee.addEventListener("click",function(){we()});function we(){q?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",q=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",q=!0)}let P=!1,be=document.getElementById("showPasswordShowConfig");be.addEventListener("click",function(){Ie()});function Ie(){P?(document.getElementById("passwordShowConfig").type="password",P=!1):(document.getElementById("passwordShowConfig").type="text",P=!0)}let _=!1,Le=document.getElementById("showPasswordDeletServer");Le.addEventListener("click",function(){Be()});function Be(){_?(document.getElementById("passwordDeletServer").type="password",_=!1):(document.getElementById("passwordDeletServer").type="text",_=!0)}let Se=document.getElementById("addUserModal");Se.addEventListener("click",function(){V()});let Me=document.getElementById("addTableUsers");Me.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,n=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value;e.length<3?y({text:"The name is less than 3 characters."}).showToast():t.length<3?y({text:"The last name is less than 3 characters."}).showToast():d.length<3?y({text:"The username is less than 3 characters."}).showToast():n.length<8?y({text:"The password is less than 8 characters."}).showToast():n!=a&&y({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&d.length>=3&&n.length>=8&&a.length>=8&&n===a&&(Te(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Ae=document.getElementById("canselAddTableUser");Ae.addEventListener("click",function(){V()});function V(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}async function Te(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,n=document.getElementById("selectAddUser").value,a=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value;await v({method:"post",url:"add-member",data:{first_name:e,last_name:t,auth_name:d,role:n,password:a,password_confirmation:s},callback:function(l){let i=document.createElement("tr");i.setAttribute("id",`tr${l.data.user.id}`),f.push({id:l.data.user.id,name:l.data.user.first_name,family:l.data.user.last_name,authName:l.data.user.auth_name,role:l.data.role});for(let r=1;r<=6;r++){let o=document.createElement("td");if(o.setAttribute("class",`td${r}`),r==1)o.innerHTML=document.getElementById("nameInputAddUser").value;else if(r==2)o.innerHTML=document.getElementById("familyInputAddUser").value;else if(r==3)o.innerHTML=document.getElementById("authNameInputAddUser").value;else if(r==4){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,o.appendChild(c),l.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):l.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(r==5){let c=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${l.data.user.id}"
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
          id="${l.data.user.id}"
          class="bi bi-trash3 removeUser cursorPointer" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}i.appendChild(o)}document.getElementById("tBody").appendChild(i),V(),se(),de()}}),document.getElementById("idLoading").style.display="none"}let xe=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=xe;let Ue=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=Ue;window.onload=function(){Ne()};let Z=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){ae();const e=this.dataset.id;T(e),document.getElementById("idLoading").style.display="flex"});let f=[],ne,N=!1;async function ae(){if(N)return;N=!0,await v({url:"show-all-users?paginate=30",callback:function(t){Z&&(document.getElementById("tBody").innerHTML=""),Z=!0;let d=t.data.user.length;for(let n=0;n<d;n++){let a=document.createElement("tr");a.setAttribute("id",`tr${t.data.user[n].id}`),f.push({id:t.data.user[n].id,name:t.data.user[n].first_name,family:t.data.user[n].last_name,authName:t.data.user[n].auth_name,role:t.data.user[n].roles[0]});for(let s=1;s<=7;s++){let l=document.createElement("td");if(l.setAttribute("class",`td${s}`),s==1)l.innerHTML=t.data.user[n].first_name;else if(s==2)l.innerHTML=t.data.user[n].last_name;else if(s==3)l.innerHTML=t.data.user[n].auth_name;else if(s==4){let i=document.createElement("span");i.innerHTML=t.data.user[n].roles[0],l.appendChild(i),t.data.user[n].roles[0]=="admin"?i.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[n].roles[0]=="expert"?i.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[n].roles[0]=="visitor"&&i.setAttribute("class","badge text-bg-success fs-5")}else if(s==5){let i=`
            <button type="button" class="btn btn-secondary"> 
            <svg
             xmlns="http://www.w3.org/2000/svg" 
             width="25" 
             height="25" 
             fill="currentColor" 
             id="${t.data.user[n].id}
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             class="bi bi-three-dots iconAccessLevel" 
             viewBox="0 0 16 16">
             <path
             d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
             </svg>
             </button>
            `;l.insertAdjacentHTML("afterbegin",i)}else if(s==6){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${t.data.user[n].id}"
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
        </svg>`;l.insertAdjacentHTML("afterbegin",i)}else if(s==7){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          id="${t.data.user[n].id}"
          fill="currentColor"
          class="bi bi-trash3 removeUser cursorPointer"
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
        >
          <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>`;l.insertAdjacentHTML("afterbegin",i)}a.appendChild(l)}document.getElementById("tBody").appendChild(a)}e(t)}}),N=!1,document.getElementById("idLoading").style.display="none";function e(t){let d=t.data.user.length,n=t.data.user;for(let a=0;a<d;a++)n[a].id}$e(),se(),de()}function de(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let d=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=d.innerHTML,ne=t.id})})}let He=document.getElementById("removeUserModalClick");He.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ce(ne)});function $e(){document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){})})}let J;function se(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",e.forEach(t=>{t.addEventListener("click",function(){J=t;let d=f.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role)})})}let ke=document.getElementById("addEditUser");ke.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",qe(J.id)});async function Ce(e){await v({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove()}}),document.getElementById("idLoading").style.display="none"}async function qe(e){let t=Number(e),d=document.getElementById("nameInputEditUser").value,n=document.getElementById("familyInputEditUser").value,a=document.getElementById("authNameInputEditUser").value,s=document.getElementById("selectEditUser").value,l=document.getElementById("passwordEditUser").value,i=document.getElementById("repeatPasswordEditUser").value;await v({method:"put",url:"reset-password-and-auth-name",data:{first_name:d,last_name:n,user_id:t,auth_name:a,role:s,password:l,password_confirmation:i},callback:function(r){let o=f.findIndex(w=>w.id==J.id);o!=-1&&(f[o].id=r.data.user.id,f[o].name=r.data.user.first_name,f[o].family=r.data.user.last_name,f[o].authName=r.data.user.auth_name,f[o].role=r.data.user.roles),document.querySelector(`#tr${e} .td1`).innerHTML=r.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=r.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=r.data.user.auth_name,document.querySelector(`#tr${e} .td4 span`).innerHTML=r.data.user.roles;let c=document.querySelector(`#tr${r.data.user.id} .td4 span`);c.innerHTML=="expert"?(c.classList.remove("text-bg-success"),c.classList.add("text-bg-primary")):c.innerHTML=="visitor"&&(c.classList.remove("text-bg-primary"),c.classList.add("text-bg-success")),y({text:"User details were successfully updated."}).showToast()}}),document.getElementById("idLoading").style.display="none"}let B,le;function Pe(e,t,d){const a=new Date().getTime()+d*24*60*60*1e3,s={value:t,expiry:a};localStorage.setItem(e,JSON.stringify(s))}function _e(e){const t=localStorage.getItem(e);if(!t)return null;const d=JSON.parse(t);return new Date().getTime()>d.expiry?(localStorage.removeItem(e),null):d.value}async function Ne(){await v({url:"get-me",callback:function(a){ye(a.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await v({url:"show-all-servers",callback:function(a){B=a.data,Fe(B)}}),document.getElementById("idLoading").style.display="none",Ze();const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let d;e.forEach(a=>{a.addEventListener("click",function(){d=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",De(d)});const n=document.querySelectorAll(".editServer");re(n)}function re(e){e.forEach(t=>{t.addEventListener("click",function(){let d=B.find(s=>s.id==this.dataset.id);le=this.dataset.id;let n=d.name,a=d.ip;document.querySelector('input[name="nameEditNameServer"]').value=n,document.querySelector('input[name="nameEditIpServer"]').value=a})})}async function De(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,d=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await v({method:"post",url:"test-connection",data:{server_id:e,username:t,password:d},callback:function(n){Pe("userData",{username:t,password:d},3),_e("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function ze(e){let t=document.getElementById("editNameServer").value,d=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await v({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:d},callback:function(n){let a=n.data.name,s=n.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=s,B[e-2].name=a,B[e-2].ip=s}}),document.getElementById("idLoading").style.display="none"}let je=document.getElementById("subServer");je.addEventListener("click",function(){ze(le)});let x,U,ie,j,F,L,G;function Fe(e){let t=0;const d=document.querySelector("#cardContainer");e.forEach(n=>{L=document.createElement("div"),e[t].is_down==0?L.className="info-box host col-3 ms-5":L.className="info-box off col-3 ms-5",L.setAttribute("data-server-id",`${e[t].id}`),t++,L.innerHTML=`
  <h5 id="nameServer${n.id}">${n.name}</h5>
  <p id="ipServer${n.id}">${n.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${n.id}"
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
      data-server-pause-id="${n.id}"
      id="iconPause${n.id}"
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
      data-server-play-id="${n.id}"
      id="iconPlay${n.id}"
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
      class="divFlex divIconRemoveServer d-flex justify-content-center align-items-center ms-2"
      data-server-trash-id="${n.id}"
      id="iconRemoveServer${n.id}"
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
      class="divFlex d-flex justify-content-center align-items-center Server me-2 gearConfig"
      data-bs-toggle="modal"
      data-bs-target="#serverPassword"
      data-id="${n.id}"
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
  `,d.appendChild(L)}),oe(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Re(x)}),ce(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ve(U)}),me(),document.getElementById("subDeletServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameUserNameDeletServer"]').value,a=document.querySelector('input[name="namePasswordDeletServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():a.length<8&&y({text:"The password is less than 8 characters."}).showToast(),n.length>=3&&a.length>=8&&(Je(ie),document.getElementById("idLoading").style.display="flex")}),Oe(),ue(),document.getElementById("subAddServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameAddNameServer"]').value,a=document.querySelector('input[name="nameAddIpServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():a.length<7&&y({text:"The IP is less than 7 characters."}).showToast(),n.length>=3&&a.length>=7&&(We(),document.getElementById("idLoading").style.display="flex")})}function oe(){G=document.querySelectorAll(".divIconPause"),G.forEach(e=>{e.addEventListener("click",function(){j=e.id,x=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function ce(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){F=t.id,U=this.dataset.serverPlayId;let d=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=d})})}function me(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){ie=this.dataset.serverTrashId;let d=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=d})})}async function Re(e){await v({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let d=t.msg;document.getElementById(`${j}`).classList.remove("d-flex"),document.getElementById(`${j}`).classList.add("d-none"),document.getElementById(`iconPlay${x}`).classList.remove("d-none"),document.getElementById(`iconPlay${x}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),y({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ve(e){await v({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let d=t.msg;document.getElementById(`${F}`).classList.remove("d-flex"),document.getElementById(`${F}`).classList.add("d-none"),document.getElementById(`iconPause${U}`).classList.remove("d-none"),document.getElementById(`iconPause${U}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),y({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Je(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;await v({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:d},callback:function(n){let a=n.msg;document.querySelector(`.info-box[data-server-id='${n.data.id}']`).remove(),y({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function Oe(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function ue(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value=""})}async function We(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value;await v({method:"post",url:"create-server",data:{name:t,ip:d},callback:function(a){B.push(a.data);const s=document.createElement("div");s.className="info-box host col-3 ms-5",s.setAttribute("data-server-id",`${a.data.id}`),s.innerHTML=`
  <h5 id="nameServer${a.data.id}">${a.data.name}</h5>
  <p id="ipServer${a.data.id}">${a.data.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${a.data.id}"
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
      data-server-pause-id="${a.data.id}"
      id="iconPause${a.data.id}"
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
      data-server-play-id="${a.data.id}"
      id="iconPlay${a.data.id}"
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
      class="divFlex divIconRemoveServer d-flex justify-content-center align-items-center ms-2"
      data-server-trash-id="${a.data.id}"
      id="iconRemoveServer${a.data.id}"
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
      class="divFlex d-flex justify-content-center align-items-center Server me-2 gearConfig"
      data-bs-toggle="modal"
      data-bs-target="#serverPassword"
      data-id="${a.data.id}"
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
  `,e.appendChild(s),ue()}}),oe(),ce(),me();const n=document.querySelectorAll(".editServer");re(n),document.getElementById("idLoading").style.display="none"}let K=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",O(1);const e=this.dataset.id;E(e)});let Q,D=!1;async function O(e=1){if(D)return;D=!0;let t=[],d;await v({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(n){var r,o,c,w,S,M;t.push(n.data.data),K&&(document.getElementById("tBody2").innerHTML=""),K=!0;let a=Math.ceil(n.data.total/20),s;e==1,s=(e-1)*20,s++;let l=n.data.data.length;for(let m=0;m<l;m++){let u=document.createElement("tr");for(let g=1;g<=5;g++){let p=document.createElement("td");if(g==1)p.innerHTML=s++;else if(g==2){let h=document.createElement("span"),A=document.createElement("span");h.setAttribute("class","mx-2"),A.setAttribute("class","mx-2");let b=document.createElement("div");b.setAttribute("class","mt-2"),h.innerHTML=((o=(r=n.data.data[m].properties)==null?void 0:r.user)==null?void 0:o.first_name)||"-",A.innerHTML=((w=(c=n.data.data[m].properties)==null?void 0:c.user)==null?void 0:w.last_name)||"-",b.innerHTML=((M=(S=n.data.data[m].properties)==null?void 0:S.user)==null?void 0:M.auth_name)||"-",p.appendChild(h),p.appendChild(A),p.appendChild(b),b.classList.add("fontSize")}else if(g==3)p.innerHTML=n.data.data[m].event;else if(g==4){p.innerHTML=n.data.data[m].description;const h=document.createElement("div");h.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${m} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,p.appendChild(h)}else if(g==5){let h=new Date(n.data.data[m].created_at).toLocaleString();p.innerHTML=h}u.appendChild(p)}document.getElementById("tBody2").appendChild(u)}d=a,i(d,Q);function i(m,u=1){const g=document.getElementById("pagination");if(g.innerHTML="",m!=1){const p=document.createElement("li");p.className=`page-item ${u===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',g.appendChild(p);const h=document.createElement("li");h.className=`page-item ${u===1?"disabled":""}`,h.innerHTML=`<a class="page-link" href="#" data-page="${u-1}">Previous Page</a>`,g.appendChild(h);const A=u===1?u:u-1,b=u===m?u:Math.min(u+1,m);for(let I=Math.max(1,A-1);I<=Math.min(m,b+1);I++){const k=document.createElement("li");k.className=`page-item ${I===u?"active":""}`,k.innerHTML=`<a class="page-link ${I===u?"active-page":""}" href="#" data-page="${I}">${I}</a>`,g.appendChild(k)}const H=document.createElement("li");H.className=`page-item ${u===m?"disabled":""}`,H.innerHTML=`<a class="page-link" href="#" data-page="${u+1}">Next Page</a>`,g.appendChild(H);const $=document.createElement("li");$.className=`page-item ${u===m?"disabled":""}`,$.innerHTML=`<a class="page-link" href="#" data-page="${m}">Last Page</a>`,g.appendChild($)}}}}),D=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(n=>{n.addEventListener("click",function(a){a.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=d&&(document.getElementById("idLoading").style.display="flex",Q=s,O(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(n=>{n.addEventListener("click",function(){var s,l,i,r,o,c,w,S,M,m,u;let a=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][a].id,document.getElementById("logName").innerHTML=t[0][a].log_name,t[0][a].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((s=t[0][a].properties.member)==null?void 0:s.id)||"---",document.getElementById("authNameUser").innerHTML=((l=t[0][a].properties.member)==null?void 0:l.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((i=t[0][a].properties.member)==null?void 0:i.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((r=t[0][a].properties.member)==null?void 0:r.last_name)||"---"),t[0][a].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((o=t[0][a].properties)==null?void 0:o.password)||"---"),t[0][a].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((w=(c=t[0][a].properties)==null?void 0:c.server)==null?void 0:w.ip)||"---",document.getElementById("nameServer").innerHTML=((M=(S=t[0][a].properties)==null?void 0:S.server)==null?void 0:M.name)||"---"),t[0][a].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((m=t[0][a].properties)==null?void 0:m.module_name)||"---",document.getElementById("typeModule").innerHTML=((u=t[0][a].properties)==null?void 0:u.module_type)||"---")})})}let z=!1;async function ge(){z||(z=!0,await v({url:"show-all-modules",callback:function(e){document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let d=0;d<t;d++){let n=document.createElement("tr");n.setAttribute("id",`tr${e.module.module_id}`);for(let a=1;a<=4;a++){let s=document.createElement("td");if(s.setAttribute("class",`td${a}`),a==1)s.innerHTML=e.module[d].module_name;else if(a==2){let l;l=e.module[d].server_ids;let i=document.createElement("span"),r=JSON.stringify(l).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");i.innerHTML=r,s.appendChild(i)}else if(a==3)s.innerHTML=e.module[d].module_type.toUpperCase();else if(a==4){let l=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${e.module[d].module_id}"
          data-bs-toggle="modal"
          data-bs-target="#editModule"
          class="bi bi-pencil-square cursorPointer"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;s.insertAdjacentHTML("afterbegin",l)}n.appendChild(s)}document.getElementById("tBody3").appendChild(n)}}}),z=!1,document.getElementById("idLoading").style.display="none")}document.getElementById("buttonIframe1").addEventListener("click",function(){ve("iframe_a","url_input_a")});document.getElementById("buttonIframe2").addEventListener("click",function(){ve("iframe_b","url_input_b")});function ve(e,t){const d=document.getElementById(t),n=document.getElementsByName(e)[0];d&&n&&(n.src=d.value)}const W=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function R(){return window.location.hash||"#v-servers-home"}const Ze=()=>{let e=R();document.querySelector(e)&&(pe(e),W(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{W(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){W(R()),pe(R())})});let X=!0;function pe(e){if(document.querySelectorAll(".tab-pane").forEach(t=>{t.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),X){switch(e){case"#v-servers-home":E(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":T(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":T(2),ae(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":E(3),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoading").style.display="none",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":E(4),O(1),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":E(5),ge(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}X=!1}}
