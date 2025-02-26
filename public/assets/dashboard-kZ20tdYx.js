import{T as E,u as y}from"./useApi-CvrR115P.js";import{s as Le}from"./auth-CIdfLHBs.js";function le(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function se(){for(let e=1;e<=5;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;L(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;L(e),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;L(e),Ee()});function L(e){se(),le(),re(),document.querySelector(".menus"+e).classList.add("activeMenu")}function re(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;k(e)});function k(e){se(),le(),re(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let P=!1,Se=document.getElementById("showPasswordAddUser");Se.addEventListener("click",function(){Be()});function Be(){P?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",P=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",P=!0)}let N=!1,Me=document.getElementById("showPasswordEditUser");Me.addEventListener("click",function(){Ae()});function Ae(){N?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",N=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",N=!0)}let D=!1,Te=document.getElementById("showPasswordShowConfig");Te.addEventListener("click",function(){xe()});function xe(){D?(document.getElementById("passwordShowConfig").type="password",D=!1):(document.getElementById("passwordShowConfig").type="text",D=!0)}let z=!1,Ue=document.getElementById("showPasswordDeletServer");Ue.addEventListener("click",function(){ke()});function ke(){z?(document.getElementById("passwordDeletServer").type="password",z=!1):(document.getElementById("passwordDeletServer").type="text",z=!0)}let Ce=document.getElementById("addUserModal");Ce.addEventListener("click",function(){document.querySelectorAll(".accessLevelAdd").forEach(function(e){e.checked=!1}),W()});const He=document.getElementById("selectAddUser");He.addEventListener("change",e=>{const t=e.target.value;t==="visitor"?(document.getElementById("accessLevelsdAddUserVisitor").classList.add("d-flex"),document.getElementById("accessLevelsdAddUserVisitor").classList.remove("d-none"),document.getElementById("accessLevelsdAddUserExpert").classList.add("d-none"),document.getElementById("accessLevelsdAddUserExpert").classList.remove("d-flex")):t==="expert"&&(document.getElementById("accessLevelsdAddUserExpert").classList.add("d-flex"),document.getElementById("accessLevelsdAddUserExpert").classList.remove("d-none"),document.getElementById("accessLevelsdAddUserVisitor").classList.add("d-none"),document.getElementById("accessLevelsdAddUserVisitor").classList.remove("d-flex"))});let $e=document.getElementById("addTableUsers");$e.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,a=document.getElementById("authNameInputAddUser").value,d=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?E({text:"The name is less than 3 characters."}).showToast():t.length<3?E({text:"The last name is less than 3 characters."}).showToast():a.length<3?E({text:"The username is less than 3 characters."}).showToast():d.length<8?E({text:"The password is less than 8 characters."}).showToast():d!=n&&E({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&a.length>=3&&d.length>=8&&n.length>=8&&d===n&&(_e(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let qe=document.getElementById("canselAddTableUser");qe.addEventListener("click",function(){W()});function W(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}async function _e(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,a=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,l=document.getElementById("repeatPasswordAddUser").value;await y({method:"post",url:"add-member",data:{first_name:e,last_name:t,auth_name:a,role:d,password:n,password_confirmation:l},callback:function(r){let u=document.createElement("tr");u.setAttribute("id",`tr${r.data.user.id}`),b.push({id:r.data.user.id,name:r.data.user.first_name,family:r.data.user.last_name,authName:r.data.user.auth_name,role:r.data.role});for(let o=1;o<=7;o++){let c=document.createElement("td");if(c.setAttribute("class",`td${o}`),o==1)c.innerHTML=document.getElementById("nameInputAddUser").value;else if(o==2)c.innerHTML=document.getElementById("familyInputAddUser").value;else if(o==3)c.innerHTML=document.getElementById("authNameInputAddUser").value;else if(o==4){let i=document.createElement("span");i.innerHTML=document.getElementById("selectAddUser").value,c.appendChild(i),r.data.role=="expert"?i.setAttribute("class","badge text-bg-primary fs-5"):r.data.role=="visitor"&&i.setAttribute("class","badge text-bg-success fs-5")}else if(o==5){let i=`
            <button type="button" class="btn btn-secondary"  
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"> 
            <svg
             xmlns="http://www.w3.org/2000/svg" 
             width="25" 
             height="25" 
             fill="currentColor" 
             id="${r.data.user.id}
             class="bi bi-three-dots iconAccessLevel" 
             viewBox="0 0 16 16">
             <path
             d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
             </svg>
             </button>
            `;c.insertAdjacentHTML("afterbegin",i)}else if(o==6){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${r.data.user.id}"
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
        </svg>`;c.insertAdjacentHTML("afterbegin",i)}else if(o==7){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${r.data.user.id}"
          class="bi bi-trash3 removeUser cursorPointer" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;c.insertAdjacentHTML("afterbegin",i)}u.appendChild(c)}document.getElementById("tBody").appendChild(u),W(),ue(),ce()}}),document.getElementById("idLoading").style.display="none"}let Pe=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Pe;let Ne=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=Ne;window.onload=function(){Ge()};let ee=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){ie();const e=this.dataset.id;k(e),document.getElementById("idLoading").style.display="flex"});let b=[],oe,F=!1;async function ie(){if(F)return;F=!0,await y({url:"show-all-users?paginate=30",callback:function(t){ee&&(document.getElementById("tBody").innerHTML=""),ee=!0;let a=t.data.user.length;for(let d=0;d<a;d++){let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),b.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,role:t.data.user[d].roles[0]});for(let l=1;l<=7;l++){let r=document.createElement("td");if(r.setAttribute("class",`td${l}`),l==1)r.innerHTML=t.data.user[d].first_name;else if(l==2)r.innerHTML=t.data.user[d].last_name;else if(l==3)r.innerHTML=t.data.user[d].auth_name;else if(l==4){let u=document.createElement("span");u.innerHTML=t.data.user[d].roles[0],r.appendChild(u),t.data.user[d].roles[0]=="admin"?u.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?u.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&u.setAttribute("class","badge text-bg-success fs-5")}else if(l==5){let u=`
            <button type="button" class="btn btn-secondary"
            data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             > 
            <svg
             xmlns="http://www.w3.org/2000/svg" 
             width="25" 
             height="25" 
             fill="currentColor" 
             id="${t.data.user[d].id}
             
             class="bi bi-three-dots iconAccessLevel" 
             viewBox="0 0 16 16">
             <path
             d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
             </svg>
             </button>
            `;r.insertAdjacentHTML("afterbegin",u)}else if(l==6){let u=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${t.data.user[d].id}"
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
        </svg>`;r.insertAdjacentHTML("afterbegin",u)}else if(l==7){let u=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          id="${t.data.user[d].id}"
          fill="currentColor"
          class="bi bi-trash3 removeUser cursorPointer"
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
        >
          <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>`;r.insertAdjacentHTML("afterbegin",u)}n.appendChild(r)}document.getElementById("tBody").appendChild(n)}e(t)}}),F=!1,document.getElementById("idLoading").style.display="none";function e(t){let a=t.data.user.length,d=t.data.user;for(let n=0;n<a;n++)d[n].id}ze(),ue(),ce()}function ce(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let a=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=a.innerHTML,oe=t.id})})}let De=document.getElementById("removeUserModalClick");De.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",je(oe)});function ze(){document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){})})}let Z;function ue(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",e.forEach(t=>{t.addEventListener("click",function(){Z=t;let a=b.find(d=>d.id==t.id);a!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=a.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=a.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=a.authName,document.getElementById("selectEditUser").value=a.role)})})}let Fe=document.getElementById("addEditUser");Fe.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ve(Z.id)});async function je(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove()}}),document.getElementById("idLoading").style.display="none"}async function Ve(e){let t=Number(e),a=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,l=document.getElementById("selectEditUser").value,r=document.getElementById("passwordEditUser").value,u=document.getElementById("repeatPasswordEditUser").value;await y({method:"put",url:"reset-password-and-auth-name",data:{first_name:a,last_name:d,user_id:t,auth_name:n,role:l,password:r,password_confirmation:u},callback:function(o){let c=b.findIndex(g=>g.id==Z.id);c!=-1&&(b[c].id=o.data.user.id,b[c].name=o.data.user.first_name,b[c].family=o.data.user.last_name,b[c].authName=o.data.user.auth_name,b[c].role=o.data.user.roles),document.querySelector(`#tr${e} .td1`).innerHTML=o.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=o.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=o.data.user.auth_name,document.querySelector(`#tr${e} .td4 span`).innerHTML=o.data.user.roles;let i=document.querySelector(`#tr${o.data.user.id} .td4 span`);i.innerHTML=="expert"?(i.classList.remove("text-bg-success"),i.classList.add("text-bg-primary")):i.innerHTML=="visitor"&&(i.classList.remove("text-bg-primary"),i.classList.add("text-bg-success")),E({text:"User details were successfully updated."}).showToast()}}),document.getElementById("idLoading").style.display="none"}let A,me;function Re(e,t,a){const n=new Date().getTime()+a*24*60*60*1e3,l={value:t,expiry:n};localStorage.setItem(e,JSON.stringify(l))}function Oe(e){const t=localStorage.getItem(e);if(!t)return null;const a=JSON.parse(t);return new Date().getTime()>a.expiry?(localStorage.removeItem(e),null):a.value}let K;async function Ge(){await y({url:"get-me",callback:function(n){Le(n.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(n){A=n.data,K=n.data.length,Ke(A)}}),document.getElementById("idLoading").style.display="none",rt();const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let a;e.forEach(n=>{n.addEventListener("click",function(){a=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Je(a)});const d=document.querySelectorAll(".editServer");ve(d)}function ve(e){e.forEach(t=>{t.addEventListener("click",function(){let a=A.find(l=>l.id==this.dataset.id);me=this.dataset.id;let d=a.name,n=a.ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function Je(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,a=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:t,password:a},callback:function(d){Re("userData",{username:t,password:a},3),Oe("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function We(e){let t=document.getElementById("editNameServer").value,a=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:a},callback:function(d){let n=d.data.name,l=d.data.ip;document.getElementById("nameServer"+e).innerHTML=n,document.getElementById("ipServer"+e).innerHTML=l,A[e-2].name=n,A[e-2].ip=l}}),document.getElementById("idLoading").style.display="none"}let Ze=document.getElementById("subServer");Ze.addEventListener("click",function(){We(me)});let C,H,pe,R,O,M,te;function Ke(e){let t=0;const a=document.querySelector("#cardContainer");e.forEach(d=>{M=document.createElement("div"),e[t].is_down==0?M.className="info-box host col-3 ms-5":M.className="info-box off col-3 ms-5",M.setAttribute("data-server-id",`${e[t].id}`),t++,M.innerHTML=`
  <h5 id="nameServer${d.id}">${d.name}</h5>
  <p id="ipServer${d.id}">${d.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${d.id}"
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
      data-server-pause-id="${d.id}"
      id="iconPause${d.id}"
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
      data-server-play-id="${d.id}"
      id="iconPlay${d.id}"
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
      data-server-trash-id="${d.id}"
      id="iconRemoveServer${d.id}"
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
      data-id="${d.id}"
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
  `,a.appendChild(M)}),ge(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Qe(C)}),ye(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Xe(H)}),he(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?E({text:"The name is less than 3 characters."}).showToast():n.length<8&&E({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Ye(pe),document.getElementById("idLoading").style.display="flex")}),et(),fe(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?E({text:"The name is less than 3 characters."}).showToast():n.length<7&&E({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(tt(),document.getElementById("idLoading").style.display="flex")})}function ge(){te=document.querySelectorAll(".divIconPause"),te.forEach(e=>{e.addEventListener("click",function(){R=e.id,C=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function ye(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){O=t.id,H=this.dataset.serverPlayId;let a=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=a})})}function he(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){pe=this.dataset.serverTrashId;let a=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${a}\``})})}async function Qe(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let a=t.msg;document.getElementById(`${R}`).classList.remove("d-flex"),document.getElementById(`${R}`).classList.add("d-none"),document.getElementById(`iconPlay${C}`).classList.remove("d-none"),document.getElementById(`iconPlay${C}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),E({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Xe(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let a=t.msg;document.getElementById(`${O}`).classList.remove("d-flex"),document.getElementById(`${O}`).classList.add("d-none"),document.getElementById(`iconPause${H}`).classList.remove("d-none"),document.getElementById(`iconPause${H}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),E({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ye(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,a=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:a},callback:function(d){let n=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),E({text:n}).showToast()}}),document.getElementById("idLoading").style.display="none"}function et(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function fe(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value=""})}async function tt(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,a=document.querySelector('input[name="nameAddIpServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:a},callback:function(n){A.push(n.data);const l=document.createElement("div");l.className="info-box host col-3 ms-5",l.setAttribute("data-server-id",`${n.data.id}`),l.innerHTML=`
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
      class="divFlex divIconRemoveServer d-flex justify-content-center align-items-center ms-2"
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
      class="divFlex d-flex justify-content-center align-items-center Server me-2 gearConfig"
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
  `,e.appendChild(l),fe()}}),ge(),ye(),he();const d=document.querySelectorAll(".editServer");ve(d),document.getElementById("idLoading").style.display="none"}let de=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",Q(1);const e=this.dataset.id;L(e)});let ne,j=!1;async function Q(e=1){if(j)return;j=!0;let t=[],a;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var o,c,i,g,p,h;t.push(d.data.data),de&&(document.getElementById("tBody2").innerHTML=""),de=!0;let n=Math.ceil(d.data.total/20),l;e==1,l=(e-1)*20,l++;let r=d.data.data.length;for(let m=0;m<r;m++){let s=document.createElement("tr");for(let v=1;v<=5;v++){let I=document.createElement("td");if(v==1)I.innerHTML=l++;else if(v==2){let w=document.createElement("span"),T=document.createElement("span");w.setAttribute("class","mx-2"),T.setAttribute("class","mx-2");let S=document.createElement("div");S.setAttribute("class","mt-2"),w.innerHTML=((c=(o=d.data.data[m].properties)==null?void 0:o.user)==null?void 0:c.first_name)||"-",T.innerHTML=((g=(i=d.data.data[m].properties)==null?void 0:i.user)==null?void 0:g.last_name)||"-",S.innerHTML=((h=(p=d.data.data[m].properties)==null?void 0:p.user)==null?void 0:h.auth_name)||"-",I.appendChild(w),I.appendChild(T),I.appendChild(S),S.classList.add("fontSize")}else if(v==3)I.innerHTML=d.data.data[m].event;else if(v==4){I.innerHTML=d.data.data[m].description;const w=document.createElement("div");w.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${m} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,I.appendChild(w)}else if(v==5){let w=new Date(d.data.data[m].created_at).toLocaleString();I.innerHTML=w}s.appendChild(I)}document.getElementById("tBody2").appendChild(s)}a=n,u(a,ne);function u(m,s=1){const v=document.getElementById("pagination");if(v.innerHTML="",m!=1){const I=document.createElement("li");I.className=`page-item ${s===1?"disabled":""}`,I.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',v.appendChild(I);const w=document.createElement("li");w.className=`page-item ${s===1?"disabled":""}`,w.innerHTML=`<a class="page-link" href="#" data-page="${s-1}">Previous Page</a>`,v.appendChild(w);const T=s===1?s:s-1,S=s===m?s:Math.min(s+1,m);for(let B=Math.max(1,T-1);B<=Math.min(m,S+1);B++){const _=document.createElement("li");_.className=`page-item ${B===s?"active":""}`,_.innerHTML=`<a class="page-link ${B===s?"active-page":""}" href="#" data-page="${B}">${B}</a>`,v.appendChild(_)}const $=document.createElement("li");$.className=`page-item ${s===m?"disabled":""}`,$.innerHTML=`<a class="page-link" href="#" data-page="${s+1}">Next Page</a>`,v.appendChild($);const q=document.createElement("li");q.className=`page-item ${s===m?"disabled":""}`,q.innerHTML=`<a class="page-link" href="#" data-page="${m}">Last Page</a>`,v.appendChild(q)}}}}),j=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const l=parseInt(this.getAttribute("data-page"));!isNaN(l)&&l>0&&l<=a&&(document.getElementById("idLoading").style.display="flex",ne=l,Q(l),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){var l,r,u,o,c,i,g,p,h,m,s;let n=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][n].id,document.getElementById("logName").innerHTML=t[0][n].log_name,t[0][n].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((l=t[0][n].properties.member)==null?void 0:l.id)||"---",document.getElementById("authNameUser").innerHTML=((r=t[0][n].properties.member)==null?void 0:r.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((u=t[0][n].properties.member)==null?void 0:u.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((o=t[0][n].properties.member)==null?void 0:o.last_name)||"---"),t[0][n].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((c=t[0][n].properties)==null?void 0:c.password)||"---"),t[0][n].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((g=(i=t[0][n].properties)==null?void 0:i.server)==null?void 0:g.ip)||"---",document.getElementById("nameServer").innerHTML=((h=(p=t[0][n].properties)==null?void 0:p.server)==null?void 0:h.name)||"---"),t[0][n].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((m=t[0][n].properties)==null?void 0:m.module_name)||"---",document.getElementById("typeModule").innerHTML=((s=t[0][n].properties)==null?void 0:s.module_type)||"---")})})}let f=[],V=!1,x,G;async function Ee(){document.getElementById("idLoading").style.display="flex",!V&&(V=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let a=0;a<t;a++){G=a+1,f.push({serverIDs:e.module[a].server_ids,moduleID:e.module[a].module_id,moduleType:[e.module[a].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${a+1}`);for(let n=1;n<=4;n++){let l=document.createElement("td");if(l.setAttribute("class",`td${n}`),n==1)l.innerHTML=e.module[a].module_name;else if(n==2){let r;r=e.module[a].server_ids;let u=document.createElement("span"),o=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");u.innerHTML=o,l.appendChild(u)}else if(n==3){let r=e.module[a].module_type.toUpperCase(),u=JSON.stringify(r).replace(/[\[\]"\s\\]+/g,"");l.innerHTML=u}else if(n==4){let r=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${a+1}"
          data-id-modules = "${a+1}"
          data-bs-toggle="modal"
          data-bs-target="#editModule"
          class="bi bi-pencil-square editModuleClick cursorPointer"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;l.insertAdjacentHTML("afterbegin",r)}d.appendChild(l)}document.getElementById("tBody3").appendChild(d)}}}),Ie(),V=!1,document.getElementById("idLoading").style.display="none")}document.getElementById("buttonIframe1").addEventListener("click",function(){we("iframe_a","url_input_a")});document.getElementById("buttonIframe2").addEventListener("click",function(){we("iframe_b","url_input_b")});function Ie(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){x=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),a=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&a?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=a):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",nt(d),dt()})})}function we(e,t){const a=document.getElementById(t),d=document.getElementsByName(e)[0];a&&d&&(d.src=a.value)}function dt(){let e;for(let n=0;n<f.length;n++)f[n].moduleID==X&&(e=f[n].moduleType);const t=e.map(n=>n.toLowerCase()),a=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?a.checked=!0:a.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,a.checked=!0)}let X,U=[];function nt(e){let t=f[e-1].serverIDs,a=t.length;X=f[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td1`).innerHTML;for(let d=1;d<=K;d++){let n=document.createElement("div");n.setAttribute("class","form-check");let l=document.createElement("input");l.setAttribute("class","form-check-input editModalCheckbox"),l.setAttribute("data-server-id",`${d}`),l.setAttribute("value",""),l.setAttribute("type","checkbox"),l.setAttribute("id",`selectServer${d}`);let r=document.createElement("label");r.setAttribute("class","form-check-label"),r.setAttribute("for",`selectServer${d}`),r.innerHTML=`server ${d}`,n.appendChild(l),n.appendChild(r),document.getElementById("ServerEditModule").appendChild(n)}U=[];for(let d=0;d<a;d++)U.push(t[d]),document.getElementById(`selectServer${t[d]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){at(X)});async function at(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,l=document.getElementById("moduleType5GC"),r=document.getElementById("moduleTypeEPC");l.checked&&r.checked?n="Epc, 5gc":l.checked?n="5gc":r.checked&&(n="Epc");let u=document.querySelector('input[name="name_InputUserNameModule"]').value,o=document.querySelector('input[name="name_InputPasswordModule"]').value,c=[];document.querySelectorAll(".editModalCheckbox").forEach(p=>{p.checked&&c.push(Number(p.getAttribute("data-server-id")))});let i=new FormData;i.append("module_id",e),i.append("name",t),d&&i.append("config_file",d),i.append("type",n),c.forEach(p=>{i.append("server_ids[]",p)}),i.append("username",u),i.append("password",o);let g=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:i,headers:{"Content-Type":"multipart/form-data"},callback:function(p){let h=p.module.module_server.length,m=p.module.module_server;for(let s=0;s<f.length;s++)if(f[s].moduleID==e){f[s].serverIDs.length=0;for(let v=0;v<m.length;v++)f[s].serverIDs.push(m[v])}for(let s=0;s<f.length;s++)f[s].moduleType.length=0,f[s].moduleID==e&&f[s].moduleType.push(p.module.module_type);U=[];for(let s=0;s<h;s++)U.push(p.module.module_server[s]),document.getElementById(`selectServer${m[s]}`).checked=!0;if(U.length===0)document.querySelector(`#tr${x}`).remove(),E({text:"The module has been successfully deleted."}).showToast();else{g.checked&&(localStorage.setItem("userNameServer",u),localStorage.setItem("passwordServer",o)),document.querySelector(`#tr${x} .td1`).innerHTML=p.module.module_name;let s=p.module.module_server,v=JSON.stringify(s).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${x} .td2`).innerHTML=v,document.querySelector(`#tr${x} .td3`).innerHTML=p.module.module_type.toUpperCase()}}})}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),document.getElementById("ServerAddModule").innerHTML="",lt()});function lt(){for(let e=1;e<=K;e++){let t=document.createElement("div");t.setAttribute("class","form-check");let a=document.createElement("input");a.setAttribute("class","form-check-input addModalCheckbox"),a.setAttribute("data-server-id",`${e}`),a.setAttribute("value",""),a.setAttribute("type","checkbox"),a.setAttribute("id",`selectServer${e}`);let d=document.createElement("label");d.setAttribute("class","form-check-label"),d.setAttribute("for",`selectServer${e}`),d.innerHTML=`server ${e}`,t.appendChild(a),t.appendChild(d),document.getElementById("ServerAddModule").appendChild(t)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t)),st()});async function st(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,a=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),l=document.getElementById("moduleAddTypeEPC");n.checked&&l.checked?d="Epc, 5gc":n.checked?d="5gc":l.checked&&(d="Epc");let r=document.querySelector('input[name="name_InputUserNameAddModule"]').value,u=document.querySelector('input[name="name_InputPasswordAddModule"]').value,o=[];document.querySelectorAll(".addModalCheckbox").forEach(g=>{g.checked&&o.push(Number(g.getAttribute("data-server-id")))});let c=new FormData;c.append("name",e),a&&c.append("config_file",a),c.append("type",d);let i=0;o.forEach(g=>{c.append(`server_id[${i}]`,g),i++}),c.append("username",r),c.append("password",u),await y({url:"create-module",method:"post",data:c,headers:{"Content-Type":"multipart/form-data"},callback:function(g){console.log(g),console.log(f);let p=document.createElement("tr");p.setAttribute("id",`tr${++G}`);for(let h=1;h<=4;h++){let m=document.createElement("td");if(m.setAttribute("class",`td${h}`),h==1)m.innerHTML=document.getElementById("moduleAddName").value;else if(h==2){let s=[];for(let v=0;v<g.data.created_modules.length;v++)s.push(g.data.created_modules[v].server.server_id);m.innerHTML=s.join(", ")}else if(h==3){let s=[];for(let v=0;v<1;v++)s.push(g.data.created_modules[v].module.module_type.toUpperCase());m.innerHTML=s.join(", ")}else if(h==4){let s=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${G}"
          data-bs-toggle="modal"
          data-bs-target="#editModule"
          class="bi bi-pencil-square editModuleClick cursorPointer"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;m.insertAdjacentHTML("afterbegin",s)}p.appendChild(m)}document.getElementById("tBody3").appendChild(p),Ie(),E({text:g.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}const Y=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function J(){return window.location.hash||"#v-servers-home"}const rt=()=>{let e=J();document.querySelector(e)&&(be(e),Y(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{Y(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){Y(J()),be(J())})});let ae=!0;function be(e){if(document.querySelectorAll(".tab-pane").forEach(t=>{t.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),ae){switch(e){case"#v-servers-home":L(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":k(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":k(2),ie(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":console.log(document.getElementById("tab1")),L(3),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoading").style.display="none",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":L(4),Q(1),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":L(5),Ee(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}ae=!1}}
