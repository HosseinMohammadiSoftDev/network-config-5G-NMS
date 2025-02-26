import{T as y,u as v}from"./useApi-BPfDY8dj.js";import{s as me}from"./auth-CIdfLHBs.js";function G(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function K(){for(let e=1;e<=5;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e)});document.querySelector("#V-monitoring").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e)});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;E(e),oe()});function E(e){K(),G(),Q(),document.querySelector(".menus"+e).classList.add("activeMenu")}function Q(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;A(e)});function A(e){K(),G(),Q(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let q=!1,ue=document.getElementById("showPasswordAddUser");ue.addEventListener("click",function(){ge()});function ge(){q?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",q=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",q=!0)}let P=!1,ve=document.getElementById("showPasswordEditUser");ve.addEventListener("click",function(){pe()});function pe(){P?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",P=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",P=!0)}let N=!1,ye=document.getElementById("showPasswordShowConfig");ye.addEventListener("click",function(){he()});function he(){N?(document.getElementById("passwordShowConfig").type="password",N=!1):(document.getElementById("passwordShowConfig").type="text",N=!0)}let _=!1,fe=document.getElementById("showPasswordDeletServer");fe.addEventListener("click",function(){we()});function we(){_?(document.getElementById("passwordDeletServer").type="password",_=!1):(document.getElementById("passwordDeletServer").type="text",_=!0)}let Ee=document.getElementById("addUserModal");Ee.addEventListener("click",function(){j()});let be=document.getElementById("addTableUsers");be.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,n=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value;e.length<3?y({text:"The name is less than 3 characters."}).showToast():t.length<3?y({text:"The last name is less than 3 characters."}).showToast():d.length<3?y({text:"The username is less than 3 characters."}).showToast():n.length<8?y({text:"The password is less than 8 characters."}).showToast():n!=a&&y({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&d.length>=3&&n.length>=8&&a.length>=8&&n===a&&(Le(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Ie=document.getElementById("canselAddTableUser");Ie.addEventListener("click",function(){j()});function j(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}async function Le(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,n=document.getElementById("selectAddUser").value,a=document.getElementById("passwordAddUser").value,l=document.getElementById("repeatPasswordAddUser").value;await v({method:"post",url:"add-member",data:{first_name:e,last_name:t,auth_name:d,role:n,password:a,password_confirmation:l},callback:function(s){let i=document.createElement("tr");i.setAttribute("id",`tr${s.data.user.id}`),f.push({id:s.data.user.id,name:s.data.user.first_name,family:s.data.user.last_name,authName:s.data.user.auth_name,role:s.data.role});for(let r=1;r<=6;r++){let o=document.createElement("td");if(o.setAttribute("class",`td${r}`),r==1)o.innerHTML=document.getElementById("nameInputAddUser").value;else if(r==2)o.innerHTML=document.getElementById("familyInputAddUser").value;else if(r==3)o.innerHTML=document.getElementById("authNameInputAddUser").value;else if(r==4){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,o.appendChild(c),s.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):s.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(r==5){let c=`<svg
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
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}i.appendChild(o)}document.getElementById("tBody").appendChild(i),j(),te(),ee()}}),document.getElementById("idLoading").style.display="none"}let Se=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Se;let Be=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=Be;window.onload=function(){$e()};let J=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){Y();const e=this.dataset.id;A(e),document.getElementById("idLoading").style.display="flex"});let f=[],X;async function Y(){await v({url:"show-all-users?paginate=30",callback:function(t){console.log(t),J&&(document.getElementById("tBody").innerHTML=""),J=!0;let d=t.data.user.length;for(let n=0;n<d;n++){let a=document.createElement("tr");a.setAttribute("id",`tr${t.data.user[n].id}`),f.push({id:t.data.user[n].id,name:t.data.user[n].first_name,family:t.data.user[n].last_name,authName:t.data.user[n].auth_name,role:t.data.user[n].roles[0]});for(let l=1;l<=7;l++){let s=document.createElement("td");if(s.setAttribute("class",`td${l}`),l==1)s.innerHTML=t.data.user[n].first_name;else if(l==2)s.innerHTML=t.data.user[n].last_name;else if(l==3)s.innerHTML=t.data.user[n].auth_name;else if(l==4){let i=document.createElement("span");i.innerHTML=t.data.user[n].roles[0],s.appendChild(i),t.data.user[n].roles[0]=="admin"?i.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[n].roles[0]=="expert"?i.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[n].roles[0]=="visitor"&&i.setAttribute("class","badge text-bg-success fs-5")}else if(l==5)s.insertAdjacentHTML("afterbegin",`
            <button type="button" class="btn btn-secondary"> 
            <svg
             xmlns="http://www.w3.org/2000/svg" 
             width="25" 
             height="25" 
             fill="currentColor" 
             class="bi bi-three-dots" 
             viewBox="0 0 16 16">
             <path
             d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
             </svg>
             </button>
            `);else if(l==6){let i=`<svg
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
        </svg>`;s.insertAdjacentHTML("afterbegin",i)}else if(l==7){let i=`<svg
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
        </svg>`;s.insertAdjacentHTML("afterbegin",i)}a.appendChild(s)}document.getElementById("tBody").appendChild(a)}e(t)}}),document.getElementById("idLoading").style.display="none";function e(t){let d=t.data.user.length,n=t.data.user;for(let a=0;a<d;a++)n[a].id}te(),ee()}function ee(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let d=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=d.innerHTML,X=t.id})})}let Me=document.getElementById("removeUserModalClick");Me.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",xe(X)});let F;function te(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",e.forEach(t=>{t.addEventListener("click",function(){F=t;let d=f.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role)})})}let Te=document.getElementById("addEditUser");Te.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ae(F.id)});async function xe(e){await v({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove()}}),document.getElementById("idLoading").style.display="none"}async function Ae(e){let t=Number(e),d=document.getElementById("nameInputEditUser").value,n=document.getElementById("familyInputEditUser").value,a=document.getElementById("authNameInputEditUser").value,l=document.getElementById("selectEditUser").value,s=document.getElementById("passwordEditUser").value,i=document.getElementById("repeatPasswordEditUser").value;await v({method:"put",url:"reset-password-and-auth-name",data:{first_name:d,last_name:n,user_id:t,auth_name:a,role:l,password:s,password_confirmation:i},callback:function(r){let o=f.findIndex(w=>w.id==F.id);o!=-1&&(f[o].id=r.data.user.id,f[o].name=r.data.user.first_name,f[o].family=r.data.user.last_name,f[o].authName=r.data.user.auth_name,f[o].role=r.data.user.roles),document.querySelector(`#tr${e} .td1`).innerHTML=r.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=r.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=r.data.user.auth_name,document.querySelector(`#tr${e} .td4 span`).innerHTML=r.data.user.roles;let c=document.querySelector(`#tr${r.data.user.id} .td4 span`);c.innerHTML=="expert"?(c.classList.remove("text-bg-success"),c.classList.add("text-bg-primary")):c.innerHTML=="visitor"&&(c.classList.remove("text-bg-primary"),c.classList.add("text-bg-success")),y({text:"User details were successfully updated."}).showToast()}}),document.getElementById("idLoading").style.display="none"}let S,ne;function Ue(e,t,d){const a=new Date().getTime()+d*24*60*60*1e3,l={value:t,expiry:a};localStorage.setItem(e,JSON.stringify(l))}function He(e){const t=localStorage.getItem(e);if(!t)return null;const d=JSON.parse(t);return new Date().getTime()>d.expiry?(localStorage.removeItem(e),null):d.value}async function $e(){await v({url:"get-me",callback:function(a){me(a.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await v({url:"show-all-servers",callback:function(a){S=a.data,Pe(S)}}),document.getElementById("idLoading").style.display="none",Fe();const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let d;e.forEach(a=>{a.addEventListener("click",function(){d=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",ke(d)});const n=document.querySelectorAll(".editServer");ae(n)}function ae(e){e.forEach(t=>{t.addEventListener("click",function(){let d=S.find(l=>l.id==this.dataset.id);ne=this.dataset.id;let n=d.name,a=d.ip;document.querySelector('input[name="nameEditNameServer"]').value=n,document.querySelector('input[name="nameEditIpServer"]').value=a})})}async function ke(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,d=document.querySelector('input[name="namePasswordShowConfig"]').value;console.log(e),localStorage.setItem("server",e),await v({method:"post",data:{server_id:e,username:t,password:d},url:"test-connection",callback:function(n){console.log(n),Ue("userData",{username:t,password:d},3),He("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function Ce(e){let t=document.getElementById("editNameServer").value,d=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await v({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:d},callback:function(n){let a=n.data.name,l=n.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=l,S[e-2].name=a,S[e-2].ip=l}}),document.getElementById("idLoading").style.display="none"}let qe=document.getElementById("subServer");qe.addEventListener("click",function(){Ce(ne)});let U,H,de,x,D,L,O;function Pe(e){let t=0;const d=document.querySelector("#cardContainer");e.forEach(n=>{L=document.createElement("div"),e[t].is_down==0?L.className="info-box host col-3 ms-5":L.className="info-box off col-3 ms-5",L.setAttribute("data-server-id",`${e[t].id}`),t++,L.innerHTML=`
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
  `,d.appendChild(L)}),le(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ne(U)}),se(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",_e(H)}),re(),document.getElementById("subDeletServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameUserNameDeletServer"]').value,a=document.querySelector('input[name="namePasswordDeletServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():a.length<8&&y({text:"The password is less than 8 characters."}).showToast(),n.length>=3&&a.length>=8&&(De(de),document.getElementById("idLoading").style.display="flex")}),ze(),ie(),document.getElementById("subAddServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameAddNameServer"]').value,a=document.querySelector('input[name="nameAddIpServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():a.length<7&&y({text:"The IP is less than 7 characters."}).showToast(),n.length>=3&&a.length>=7&&(je(),document.getElementById("idLoading").style.display="flex")})}function le(){O=document.querySelectorAll(".divIconPause"),O.forEach(e=>{e.addEventListener("click",function(){x=e.id,U=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function se(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){D=t.id,H=this.dataset.serverPlayId;let d=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=d})})}function re(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){de=this.dataset.serverTrashId;let d=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=d})})}async function Ne(e){await v({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let d=t.msg;console.log(t.msg),console.log(x),document.getElementById(`${x}`).classList.remove("d-flex"),document.getElementById(`${x}`).classList.add("d-none"),document.getElementById(`iconPlay${U}`).classList.remove("d-none"),document.getElementById(`iconPlay${U}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),y({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function _e(e){await v({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let d=t.msg;document.getElementById(`${D}`).classList.remove("d-flex"),document.getElementById(`${D}`).classList.add("d-none"),document.getElementById(`iconPause${H}`).classList.remove("d-none"),document.getElementById(`iconPause${H}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),y({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function De(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;await v({method:"delete",url:"server-delete",data:{server_id:e,username:t,password:d},callback:function(n){console.log(n);let a=n.msg;document.querySelector(`.info-box[data-server-id='${n.data.id}']`).remove(),y({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function ze(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function ie(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value=""})}async function je(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value;await v({method:"post",url:"create-server",data:{name:t,ip:d},callback:function(a){S.push(a.data);const l=document.createElement("div");l.className="info-box host col-3 ms-5",l.setAttribute("data-server-id",`${a.data.id}`),l.innerHTML=`
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
  `,e.appendChild(l),ie()}}),le(),se(),re();const n=document.querySelectorAll(".editServer");ae(n),document.getElementById("idLoading").style.display="none"}let W=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",R(1);const e=this.dataset.id;E(e)});let Z;async function R(e=1){let t=[],d;await v({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(n){var r,o,c,w,B,M;t.push(n.data.data),W&&(document.getElementById("tBody2").innerHTML=""),W=!0;let a=Math.ceil(n.data.total/20),l;e==1,l=(e-1)*20,l++;let s=n.data.data.length;for(let m=0;m<s;m++){let u=document.createElement("tr");for(let g=1;g<=5;g++){let p=document.createElement("td");if(g==1)p.innerHTML=l++;else if(g==2){let h=document.createElement("span"),T=document.createElement("span");h.setAttribute("class","mx-2"),T.setAttribute("class","mx-2");let b=document.createElement("div");b.setAttribute("class","mt-2"),h.innerHTML=((o=(r=n.data.data[m].properties)==null?void 0:r.user)==null?void 0:o.first_name)||"-",T.innerHTML=((w=(c=n.data.data[m].properties)==null?void 0:c.user)==null?void 0:w.last_name)||"-",b.innerHTML=((M=(B=n.data.data[m].properties)==null?void 0:B.user)==null?void 0:M.auth_name)||"-",p.appendChild(h),p.appendChild(T),p.appendChild(b),b.classList.add("fontSize")}else if(g==3)p.innerHTML=n.data.data[m].event;else if(g==4){p.innerHTML=n.data.data[m].description;const h=document.createElement("div");h.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${m} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,p.appendChild(h)}else if(g==5){let h=new Date(n.data.data[m].created_at).toLocaleString();p.innerHTML=h}u.appendChild(p)}document.getElementById("tBody2").appendChild(u)}d=a,i(d,Z);function i(m,u=1){const g=document.getElementById("pagination");if(g.innerHTML="",m!=1){const p=document.createElement("li");p.className=`page-item ${u===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">اولین صفحه</a>',g.appendChild(p);const h=document.createElement("li");h.className=`page-item ${u===1?"disabled":""}`,h.innerHTML=`<a class="page-link" href="#" data-page="${u-1}">صفحه قبلی</a>`,g.appendChild(h);const T=u===1?u:u-1,b=u===m?u:Math.min(u+1,m);for(let I=Math.max(1,T-1);I<=Math.min(m,b+1);I++){const C=document.createElement("li");C.className=`page-item ${I===u?"active":""}`,C.innerHTML=`<a class="page-link ${I===u?"active-page":""}" href="#" data-page="${I}">${I}</a>`,g.appendChild(C)}const $=document.createElement("li");$.className=`page-item ${u===m?"disabled":""}`,$.innerHTML=`<a class="page-link" href="#" data-page="${u+1}">صفحه بعدی</a>`,g.appendChild($);const k=document.createElement("li");k.className=`page-item ${u===m?"disabled":""}`,k.innerHTML=`<a class="page-link" href="#" data-page="${m}">آخرین صفحه</a>`,g.appendChild(k)}}}}),document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(n=>{n.addEventListener("click",function(a){a.preventDefault();const l=parseInt(this.getAttribute("data-page"));!isNaN(l)&&l>0&&l<=d&&(document.getElementById("idLoading").style.display="flex",Z=l,R(l),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(n=>{n.addEventListener("click",function(){var l,s,i,r,o,c,w,B,M,m,u;let a=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][a].id,document.getElementById("logName").innerHTML=t[0][a].log_name,t[0][a].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((l=t[0][a].properties.member)==null?void 0:l.id)||"---",document.getElementById("authNameUser").innerHTML=((s=t[0][a].properties.member)==null?void 0:s.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((i=t[0][a].properties.member)==null?void 0:i.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((r=t[0][a].properties.member)==null?void 0:r.last_name)||"---"),t[0][a].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((o=t[0][a].properties)==null?void 0:o.password)||"---"),t[0][a].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((w=(c=t[0][a].properties)==null?void 0:c.server)==null?void 0:w.ip)||"---",document.getElementById("nameServer").innerHTML=((M=(B=t[0][a].properties)==null?void 0:B.server)==null?void 0:M.name)||"---"),t[0][a].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((m=t[0][a].properties)==null?void 0:m.module_name)||"---",document.getElementById("typeModule").innerHTML=((u=t[0][a].properties)==null?void 0:u.module_type)||"---")})})}async function oe(){await v({url:"show-all-modules",callback:function(e){document.getElementById("tBody3").innerHTML="",console.log(e.module.length);let t=e.module.length;for(let d=0;d<t;d++){let n=document.createElement("tr");n.setAttribute("id",`tr${e.module.module_id}`);for(let a=1;a<=4;a++){let l=document.createElement("td");if(l.setAttribute("class",`td${a}`),a==1)l.innerHTML=e.module[d].module_name;else if(a==2){let s;s=e.module[d].server_ids;let i=document.createElement("span"),r=JSON.stringify(s).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");i.innerHTML=r,l.appendChild(i)}else if(a==3)l.innerHTML=e.module[d].module_type.toUpperCase();else if(a==4){let s=`<svg
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
        </svg>`;l.insertAdjacentHTML("afterbegin",s)}n.appendChild(l)}document.getElementById("tBody3").appendChild(n)}}}),document.getElementById("idLoading").style.display="none"}const V=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function z(){return window.location.hash||"#v-servers-home"}const Fe=()=>{let e=z();document.querySelector(e)&&(ce(e),V(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{V(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){V(z()),ce(z())})});function ce(e){switch(document.querySelectorAll(".tab-pane").forEach(t=>{t.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),e){case"#v-servers-home":E(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":A(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":A(2),Y(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":E(4),R(1),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":E(5),oe(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}}
