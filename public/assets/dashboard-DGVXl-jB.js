import{T as p,u as y}from"./useApi-Mgb1BH1A.js";import{s as dt}from"./auth-CIdfLHBs.js";function V(e){for(let t=1;t<=e;t++)document.querySelector(".subMenu"+t).classList.remove("clickSubMenu")}let B=[1,2,3,4,5];function Se(){for(let e=1;e<=B.length;e++)document.querySelector(".menus"+B[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;x(e),Xe(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e),Ge()});function x(e){et(),Se(),V(),Le(),document.querySelector(".menus"+e).classList.add("activeMenu")}function Le(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;F(e)});function F(e){et(),Se(),V(),Le(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let Q=!1,lt=document.getElementById("showPasswordAddUser");lt.addEventListener("click",function(){nt()});function nt(){Q?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",Q=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",Q=!0)}let X=!1,at=document.getElementById("showPasswordEditUser");at.addEventListener("click",function(){st()});function st(){X?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",X=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",X=!0)}let Y=!1,rt=document.getElementById("showPasswordShowConfig");rt.addEventListener("click",function(){ot()});function ot(){Y?(document.getElementById("passwordShowConfig").type="password",Y=!1):(document.getElementById("passwordShowConfig").type="text",Y=!0)}let ee=!1,it=document.getElementById("showPasswordDeletServer");it.addEventListener("click",function(){ct()});function ct(){ee?(document.getElementById("passwordDeletServer").type="password",ee=!1):(document.getElementById("passwordDeletServer").type="text",ee=!0)}async function Ae(){await y({url:"show-all-permission",callback:function(e){document.getElementById("showAccessLevel").innerHTML="",document.getElementById("divAccessLevelEdit").innerHTML="";for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevel${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevel${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckboxEdit"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevelEdit${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevelEdit${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("divAccessLevelEdit").appendChild(l)}}})}Ae();let G,R,$=[],L;async function Me(){await y({url:"show-all-roles",callback:function(e){e.data[0],G=e.data[1],R=e.data[2],L=document.querySelectorAll('input[type="checkbox"][data-id]'),$=[],L.forEach(t=>{$.push(t.getAttribute("data-id"))}),L.forEach(t=>{R.permissions.some(d=>d===t.getAttribute("data-id"))&&(t.checked=!0),t.disabled=!1})}})}function ut(){document.getElementById("selectAccessLevel3").checked&&(document.getElementById("selectAccessLevel2").checked=!0)}function mt(){L.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(G.permissions.forEach(e=>{$.includes(e)&&L.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),L.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&R.permissions.forEach(e=>{$.includes(e)&&L.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function vt(){L.forEach(e=>{console.log(e),e.checked=!1,e.disabled=!1}),this.value==="visitor"?(G.permissions.forEach(e=>{$.includes(e)&&L.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),L.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&R.permissions.forEach(e=>{$.includes(e)&&L.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function gt(e){L.forEach(t=>{t.disabled=!0}),e==="visitor"?G.permissions.forEach(t=>{$.includes(t)&&L.forEach(l=>{l.getAttribute("data-id")===t&&(l.disabled=!1)})}):L.forEach(t=>{t.disabled=!1})}document.getElementById("selectAddUser").addEventListener("change",mt);document.getElementById("selectEditUser").addEventListener("change",vt);Me();let ht=document.getElementById("addUserModal");ht.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",U=[],J=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),ie(),Me(),ut()});let U=[];function pt(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}function ft(){document.querySelectorAll(".accessLevelCheckboxEdit").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}let yt=document.getElementById("addTableUsers");yt.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?p({text:"The name is less than 3 characters."}).showToast():t.length<3?p({text:"The last name is less than 3 characters."}).showToast():l.length<3?p({text:"The username is less than 3 characters."}).showToast():d.length<8?p({text:"The password is less than 8 characters."}).showToast():d!=n&&p({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&d.length>=8&&n.length>=8&&d===n&&(wt(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Et=document.getElementById("canselAddTableUser");Et.addEventListener("click",function(){ie()});function ie(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const bt=document.querySelectorAll(".accessLevelAdd");bt.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let J=0;async function wt(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value,r=new FormData;r.append("first_name",e),r.append("last_name",t),r.append("auth_name",l),r.append("role",d),r.append("password",n),r.append("password_confirmation",s),console.log("AddUser"),pt(),U.forEach(a=>{r.append(`permission_name[${J++}]`,a)}),await y({method:"post",url:"add-member",data:r,headers:{"Content-Type":"multipart/form-data"},callback:function(a){k.push(a.data.user);let c=document.createElement("tr");c.setAttribute("id",`tr${a.data.user.id}`),c.setAttribute("data-id",`${a.data.user.id}`),S.push({id:a.data.user.id,name:a.data.user.first_name,family:a.data.user.last_name,authName:a.data.user.auth_name,permission:a.data.permission_name,role:a.data.role});for(let u=1;u<=8;u++){let v=document.createElement("td");if(v.setAttribute("class",`td${u}`),u==1)console.log(k.length),v.innerHTML=k.length;else if(u==2)v.innerHTML=document.getElementById("nameInputAddUser").value;else if(u==3)v.innerHTML=document.getElementById("familyInputAddUser").value;else if(u==4)v.innerHTML=document.getElementById("authNameInputAddUser").value;else if(u==5){let i=document.createElement("span");i.innerHTML=document.getElementById("selectAddUser").value,v.appendChild(i),a.data.role=="expert"?i.setAttribute("class","badge text-bg-primary fs-5"):a.data.role=="visitor"&&i.setAttribute("class","badge text-bg-success fs-5")}else if(u==6){let i=`
            <button type="button" class="btn btn-secondary iconAccessLevel"  
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             id="${a.data.user.id}"
             data-id="permission_${a.data.user.id}"
            > 
            <svg
             xmlns="http://www.w3.org/2000/svg" 
             width="25" 
             height="25" 
             fill="currentColor" 
             viewBox="0 0 16 16">
             <path
             d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
             </svg>
             </button>
            `;v.insertAdjacentHTML("afterbegin",i)}else if(u==7){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${a.data.user.id}"
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
        </svg>`;v.insertAdjacentHTML("afterbegin",i)}else if(u==8){let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${a.data.user.id}"
          class="bi bi-trash3 removeUser cursorPointer" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;v.insertAdjacentHTML("afterbegin",i)}c.appendChild(v)}document.getElementById("tBody").appendChild(c),ie(),ke(),xe(),p({text:a.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let It=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=It;let St=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=St;window.onload=function(){Tt()};let he=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){Ae(),Te();const e=this.dataset.id;F(e),document.getElementById("idLoading").style.display="flex"});let S=[],Be,te=!1,pe=1,k=[];async function Te(){if(te)return;te=!0,await y({url:"show-all-users?paginate=30",callback:function(t){pe=1,S=[],he&&(document.getElementById("tBody").innerHTML=""),he=!0;let l=t.data.user.length;for(let d=0;d<l;d++){k.push(t.data.user[d]);let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),n.setAttribute("data-id",`${t.data.user[d].id}`),S.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,permission:t.data.user[d].permissions,role:t.data.user[d].roles[0]});for(let s=1;s<=8;s++){let r=document.createElement("td");if(r.setAttribute("class",`td${s}`),s==1)r.innerHTML=pe++;else if(s==2)r.innerHTML=t.data.user[d].first_name;else if(s==3)r.innerHTML=t.data.user[d].last_name;else if(s==4)r.innerHTML=t.data.user[d].auth_name;else if(s==5){let a=document.createElement("span");a.innerHTML=t.data.user[d].roles[0],r.appendChild(a),t.data.user[d].roles[0]=="admin"?a.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?a.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&a.setAttribute("class","badge text-bg-success fs-5")}else if(s==6){let a=`
            <button type="button" 
            id="${t.data.user[d].id}" 
            data-id="permission_${t.data.user[d].id}"
            class="btn btn-secondary iconAccessLevel"
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             > 
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
            `;r.insertAdjacentHTML("afterbegin",a)}else if(s==7){let a=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",a)}else if(s==8){let a=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",a)}n.appendChild(r)}document.getElementById("tBody").appendChild(n)}e(t)}}),te=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,d=t.data.user;for(let n=0;n<l;n++)d[n].id}ke(),xe()}function xe(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,Be=t.id})})}let Lt=document.getElementById("removeUserModalClick");Lt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Mt(Be)});let ce;function ke(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){U=[],document.getElementById("divShowPermission").innerHTML="";const l=S.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++){let n=l.permission[d],s=document.createElement("p");s.innerHTML=n,document.getElementById("divShowPermission").appendChild(s)}})}),e.forEach(t=>{t.addEventListener("click",function(){document.getElementById("divShowPermission").innerHTML="",console.log(S);let l=[];l=S.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++)document.querySelectorAll("#divEditUsers input").forEach(s=>{s.checked=!1});console.log(l.permission);for(let n=0;n<l.permission.length;n++){let s=l.permission[n];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(r=>{let a=document.querySelector(`label[for='${r.id}']`);if(s===a.innerHTML){let c=document.createElement("p");c.innerHTML=s,document.getElementById("divShowPermission").appendChild(c),r.checked=!0}}),document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckboxEdit").forEach(r=>{let a=document.querySelector(`label[for='${r.id}']`);if(s===a.innerHTML){let c=document.createElement("p");c.innerHTML=s,document.getElementById("divShowPermission").appendChild(c),r.checked=!0}})}ce=t;let d=S.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role,gt(d.role))})})}let At=document.getElementById("addEditUser");At.addEventListener("click",function(){J=0,document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Bt(ce.id)});async function Mt(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),k=k.filter(n=>n.id!=t.data.id);for(let n=1;n<=k.length;n++){let s=k[n-1].id;document.querySelector(`[data-id="${s}"] .td1`).innerHTML=n}p({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Bt(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,s=document.getElementById("selectEditUser").value,r=document.getElementById("passwordEditUser").value,a=document.getElementById("repeatPasswordEditUser").value,c=new FormData;c.append("user_id",t),c.append("first_name",l),c.append("last_name",d),c.append("auth_name",n),c.append("role",s),c.append("password",r),c.append("password_confirmation",a),ft(),U.forEach(u=>{c.append(`permission_name[${J++}]`,u)}),await y({method:"post",url:"edit_member",data:c,headers:{"Content-Type":"multipart/form-data"},callback:function(u){S.forEach(g=>{g.id==u.data.user.id&&(g.name=u.data.user.name,g.family=u.data.user.family,g.authName=u.data.user.authName,g.role=u.data.user.role,g.permission=u.data.user.permissions)});let v=S.findIndex(g=>g.id==ce.id);v!=-1&&(S[v].id=u.data.user.id,S[v].name=u.data.user.first_name,S[v].family=u.data.user.last_name,S[v].authName=u.data.user.auth_name,S[v].role=u.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=u.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=u.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=u.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=u.data.user.roles;let i=document.querySelector(`#tr${u.data.user.id} .td5 span`);i.innerHTML=="expert"?(i.classList.remove("text-bg-success"),i.classList.add("text-bg-primary")):i.innerHTML=="visitor"&&(i.classList.remove("text-bg-primary"),i.classList.add("text-bg-success")),p({text:u.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let A,Ue,E=[],I,Ce=!1,$e=!1;function qe(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let He="",fe,ne,ae=[];async function Tt(){await y({url:"get-me",callback:function(l){ne=l.data.user.permissionServerIds,fe=l.data.user.roles[0],I=l.data.user.permissions,dt(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(l){A=l.data;for(let d=0;d<l.data.length;d++)ae.push(l.data[d].id),E.push({numberOfServers:l.data.length,nameServer:l.data[d].name,serverStatus:l.data[d].is_down});Ct(A)}}),document.getElementById("idLoading").style.display="none",Rt();const e=document.querySelectorAll(".Server");Ne(e);const t=document.querySelectorAll(".editServer");De(t),He=qe(I[0]),I.includes("user")?V(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),V(1)),I.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),B=B.filter(l=>l!=1)),I.includes("VM/create")||document.getElementById("iconAddServer").remove(),I.includes("VM/update")||document.querySelectorAll(".editServer").forEach(l=>{l.remove()}),I.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.remove()}),I.includes("module/read")||(document.getElementById("v-module-tab").remove(),B=B.filter(l=>l!=5)),I.includes("module/create")||document.getElementById("addModal").remove(),I.includes("module/update")||(Ce=!0,document.getElementById("thEditModule").remove()),I.includes("module/delete")||($e=!0,document.getElementById("thRemoveModule").remove()),I.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(l=>{l.remove()}),document.querySelectorAll(".divIconPlay").forEach(l=>{l.remove()})),I.includes("log")||(document.getElementById("v-log-tab").remove(),B=B.filter(l=>l!=4)),I.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),B=B.filter(l=>l!=3)),fe!="admin"&&ae.filter(d=>!ne.includes(d)).forEach(d=>{document.querySelector(`.info-box[data-server-id='${d}']`).remove()})}function _e(){Ce&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function Pe(){$e&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function Ne(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",xt(l)})}let T;function De(e){e.forEach(t=>{t.addEventListener("click",function(){let l=A.find(s=>s.id==this.dataset.id);Ue=this.dataset.id;let d=l.name,n=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function xt(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(){localStorage.setItem("userNameServer",t),localStorage.setItem("passwordServer",l),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function kt(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(d){let n=0,s=d.data.name,r=d.data.ip;document.getElementById("nameServer"+e).innerHTML=s,document.getElementById("ipServer"+e).innerHTML=r,A.find(c=>(n++,c.id==e))&&(A[n-1].name=s,A[n-1].ip=r),p({text:d.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ut=document.getElementById("subServer");Ut.addEventListener("click",function(){kt(Ue)});let j,O,ze,se,re,_,ye;function Ct(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(d=>{_=document.createElement("div"),e[t].is_down==0?_.className="info-box host col-3 ms-5":_.className="info-box off col-3 ms-5",_.setAttribute("data-server-id",`${e[t].id}`),t++,_.innerHTML=`
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
  `,l.appendChild(_)}),Ve(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",$t(O)}),Fe(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",qt(j)}),Re(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?p({text:"The name is less than 3 characters."}).showToast():n.length<8&&p({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Ht(ze),document.getElementById("idLoading").style.display="flex")}),je(),Oe(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?p({text:"The name is less than 3 characters."}).showToast():n.length<7&&p({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(_t(),document.getElementById("idLoading").style.display="flex")})}function Ve(){ye=document.querySelectorAll(".divIconPause"),ye.forEach(e=>{e.addEventListener("click",function(){se=e.id,j=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Fe(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){re=t.id,O=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function Re(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){ze=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function $t(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=E.findIndex(n=>n.nameServer===t.data.name);l!==-1&&(E[l].serverStatus=0);let d=t.msg;document.getElementById(`${re}`).classList.remove("d-flex"),document.getElementById(`${re}`).classList.add("d-none"),document.getElementById(`iconPause${O}`).classList.remove("d-none"),document.getElementById(`iconPause${O}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),p({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function qt(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,d=E.findIndex(n=>n.nameServer===t.data.name);d!==-1&&(E[d].serverStatus=1),document.getElementById(`${se}`).classList.remove("d-flex"),document.getElementById(`${se}`).classList.add("d-none"),document.getElementById(`iconPlay${j}`).classList.remove("d-none"),document.getElementById(`iconPlay${j}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),p({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ht(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(d){E=E.filter(r=>r.nameServer!==d.data.name);let s=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),p({text:s}).showToast()}}),document.getElementById("idLoading").style.display="none"}function je(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("data-id"),l=document.getElementById("nameServer"+t).innerHTML;localStorage.setItem("nameServer",l),document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Oe(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="/etc/bbdh",document.getElementById("addPathRunConfigServer").value="/usr/bin"})}async function _t(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,d=document.querySelector('input[name="nameAddPathConfigServer"]').value,n=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:l,path_config:d,path_run_config:n},callback:function(a){ae.push(a.data.id),ne.push(a.data.id),E.push({numberOfServers:E.length,nameServer:a.data.name}),A.push(a.data);const c=document.createElement("div");c.className="info-box host col-3 ms-5",c.setAttribute("data-server-id",`${a.data.id}`),c.innerHTML=`
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
  `,e.appendChild(c),Oe(),je(),p({text:a.msg}).showToast()}}),Ve(),Fe(),Re();const s=document.querySelectorAll(".Server");Ne(s);const r=document.querySelectorAll(".editServer");De(r),document.getElementById("idLoading").style.display="none"}let Ee=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",T==0&&(T=1),ue(T);const e=this.dataset.id;x(e)});let be,de=!1;async function ue(e=1){if(de)return;de=!0;let t=[],l;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var c,u,v,i,g,w;t.push(d.data.data),Ee&&(document.getElementById("tBody2").innerHTML=""),Ee=!0;let n=Math.ceil(d.data.total/20),s;e==1,s=(e-1)*20,s++;let r=d.data.data.length;for(let m=0;m<r;m++){let o=document.createElement("tr");for(let h=1;h<=5;h++){let f=document.createElement("td");if(h==1)f.innerHTML=s++;else if(h==2){let M=document.createElement("span"),N=document.createElement("span");M.setAttribute("class","mx-2"),N.setAttribute("class","mx-2");let q=document.createElement("div");q.setAttribute("class","mt-2"),M.innerHTML=((u=(c=d.data.data[m].properties)==null?void 0:c.user)==null?void 0:u.first_name)||"-",N.innerHTML=((i=(v=d.data.data[m].properties)==null?void 0:v.user)==null?void 0:i.last_name)||"-",q.innerHTML=((w=(g=d.data.data[m].properties)==null?void 0:g.user)==null?void 0:w.auth_name)||"-",f.appendChild(M),f.appendChild(N),f.appendChild(q),q.classList.add("fontSize")}else if(h==3)f.innerHTML=d.data.data[m].event;else if(h==4){f.innerHTML=d.data.data[m].description;const M=document.createElement("div");M.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${m} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,f.appendChild(M)}else if(h==5){let M=new Date(d.data.data[m].created_at).toLocaleString();f.innerHTML=M}o.appendChild(f)}document.getElementById("tBody2").appendChild(o)}l=n,a(l,be);function a(m,o=T||1){const h=document.getElementById("pagination");if(h.innerHTML="",m!=1){const f=document.createElement("li");f.className=`page-item ${o===1?"disabled":""}`,f.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',h.appendChild(f);const M=document.createElement("li");M.className=`page-item ${o===1?"disabled":""}`,M.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,h.appendChild(M);const N=o===1?o:o-1,q=o===m?o:Math.min(o+1,m);for(let H=Math.max(1,N-1);H<=Math.min(m,q+1);H++){const K=document.createElement("li");K.className=`page-item ${H===o?"active":""}`,K.innerHTML=`<a class="page-link ${H===o?"active-page":""}" href="#" data-page="${H}">${H}</a>`,h.appendChild(K)}const W=document.createElement("li");W.className=`page-item ${o===m?"disabled":""}`,W.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,h.appendChild(W);const Z=document.createElement("li");Z.className=`page-item ${o===m?"disabled":""}`,Z.innerHTML=`<a class="page-link" href="#" data-page="${m}">Last Page</a>`,h.appendChild(Z);const ge=new URL(window.location);ge.searchParams.set("log",o||1),window.history.pushState({},"",ge)}}}}),de=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=l&&(document.getElementById("idLoading").style.display="flex",be=s,ue(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){const n=this.dataset.idLog,r=t[0][n],a=document.getElementById("formLog");a.innerHTML="",r?c(r,a):a.innerHTML='<p class="highlight">No data found for the given ID.</p>';function c(v,i,g=0){for(const w in v)if(v.hasOwnProperty(w)){const m=v[w],o=document.createElement("p");if(o.style.marginLeft=`${g*20}px`,typeof m=="object"&&m!==null)o.innerHTML=`<strong>${w}:</strong>`,i.appendChild(o),c(m,i,g+1);else if(typeof m=="string"&&u(m)){o.innerHTML=`<strong>${w}:</strong>`,i.appendChild(o);const h=JSON.parse(m);c(h,i,g+1)}else o.innerHTML=`<strong>${w}:</strong> <span class="highlight">${m}</span>`,i.appendChild(o)}}function u(v){try{JSON.parse(v)}catch{return!1}return!0}})})}let b=[],le=!1,D,P,we=1,C=[];async function Ge(){document.getElementById("idLoading").style.display="flex",!le&&(le=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),we=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){C.push(e.module[l].module_id),P=l+1,b.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${l+1}`),d.setAttribute("data-id",`${e.module[l].module_id}`);for(let n=1;n<=6;n++){let s=document.createElement("td");if(s.setAttribute("class",`td${n}`),n==1)s.innerHTML=we++;else if(n==2)s.innerHTML=e.module[l].module_name;else if(n==3){let r;r=e.module[l].server_ids;let a=document.createElement("span"),c=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");a.innerHTML=c,s.appendChild(a)}else if(n==4){let r=e.module[l].module_type.toUpperCase(),a=JSON.stringify(r).replace(/[\[\]"\s\\]+/g,"");s.innerHTML=a}else if(n==5){s.setAttribute("class","td5 tdEditModule");let r=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${l+1}"
          data-id-modules = "${l+1}"
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
        </svg>`;s.insertAdjacentHTML("afterbegin",r)}else if(n==6){s.setAttribute("class","td6 tdRemoveModule");let r=`<svg 
            xmlns="http://www.w3.org/2000/svg"
           width="26" 
           height="26" 
           id="${l+1}"
           data-id-modules = "${l+1}"
           data-bs-toggle="modal"
           data-bs-target="#removeModule"
           fill="currentColor" 
           class="bi bi-trash3 deleteModuleClick cursorPointer"
           viewBox="0 0 16 16">
           <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
           </svg>`;s.insertAdjacentHTML("afterbegin",r)}d.appendChild(s)}document.getElementById("tBody3").appendChild(d)}}}),Je(),Qe(),le=!1,document.getElementById("idLoading").style.display="none",Pe(),_e())}document.getElementById("buttonIframe1").addEventListener("click",function(){We("iframe_a","url_input_a"),Ye()});document.getElementById("buttonIframe2").addEventListener("click",function(){We("iframe_b","url_input_b"),Ye()});function Je(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){D=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",Nt(d),Pt()})})}function We(e,t){const l=document.getElementById(t),d=document.getElementsByName(e)[0];l&&d&&(d.src=l.value)}function Pt(){let e;for(let n=0;n<b.length;n++)b[n].moduleID==me&&(e=b[n].moduleType);const t=e.map(n=>n.toLowerCase()),l=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,l.checked=!0)}let me,z=[];function Nt(e){let t=b[e-1].serverIDs,l=t.length;me=b[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let d=E.length;for(let n=1;n<=d;n++){let s=A[n-1].id,r=document.createElement("div");r.setAttribute("class","form-check");let a=document.createElement("input");a.setAttribute("class","form-check-input editModalCheckbox"),a.setAttribute("data-server-id",`${s}`),a.setAttribute("value",""),a.setAttribute("type","checkbox"),a.setAttribute("id",`selectServer${s}`);let c=document.createElement("label");c.setAttribute("class","form-check-label"),c.setAttribute("for",`selectServer${s}`),c.innerHTML=`${E[n-1].nameServer}`,r.appendChild(a),r.appendChild(c),document.getElementById("ServerEditModule").appendChild(r)}z=[];for(let n=0;n<l;n++)z.push(t[n]),document.getElementById(`selectServer${t[n]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Dt(me)});async function Dt(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,s=document.getElementById("moduleType5GC"),r=document.getElementById("moduleTypeEPC");s.checked?n="5gc":r.checked&&(n="Epc");let a=document.querySelector('input[name="name_InputUserNameModule"]').value,c=document.querySelector('input[name="name_InputPasswordModule"]').value,u=[];document.querySelectorAll(".editModalCheckbox").forEach(g=>{g.checked&&u.push(Number(g.getAttribute("data-server-id")))});let v=new FormData;v.append("module_id",e),v.append("name",t),d&&v.append("config_file",d),v.append("type",n),u.forEach(g=>{v.append("server_ids[]",g)}),v.append("username",a),v.append("password",c);let i=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:v,headers:{"Content-Type":"multipart/form-data"},callback:function(g){let w=g.module.module_server.length,m=g.module.module_server;for(let o=0;o<b.length;o++)if(b[o].moduleID==e){b[o].serverIDs.length=0;for(let h=0;h<m.length;h++)b[o].serverIDs.push(m[h])}for(let o=0;o<b.length;o++)b[o].moduleType.length=0,b[o].moduleID==e&&b[o].moduleType.push(g.module.module_type);z=[];for(let o=0;o<w;o++)z.push(g.module.module_server[o]),document.getElementById(`selectServer${m[o]}`).checked=!0;if(z.length===0)document.querySelector(`#tr${D} .td3`).innerHTML="";else{i.checked&&(localStorage.setItem("userNameServer",a),localStorage.setItem("passwordServer",c)),document.querySelector(`#tr${D} .td2`).innerHTML=g.module.module_name;let o=g.module.module_server,h=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${D} .td3`).innerHTML=h,document.querySelector(`#tr${D} .td4`).innerHTML=g.module.module_type.toUpperCase()}p({text:g.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ze,Ke;function Qe(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,Ke=`#tr${e.id}`,Ze=b[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){zt()});async function zt(){await y({url:"delete-module",method:"delete",data:{module_id:Ze},callback:function(e){C=C.filter(l=>l!=e.module.id),document.querySelector(`${Ke}`).remove();for(let l=1;l<=C.length;l++){let d=C[l-1];document.querySelector(`[data-id="${d}"] .td1`).innerHTML=l}p({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(A),console.log(E),document.getElementById("ServerAddModule").innerHTML="",Vt();for(let l=0;l<E.length;l++)if(E[l].serverStatus==1){for(let d=0;d<E.length;d++)if(A[l].name==E[d].nameServer){console.log(A[l].id);let n=A[l].id;console.log(n),console.log(document.getElementById(`selectServer${n}`)),document.getElementById(`selectServer${n}`).disabled=!0}}});function Vt(){let e=E.length;for(let t=1;t<=e;t++){let l=A[t-1].id,d=document.createElement("div");d.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input addModalCheckbox"),n.setAttribute("data-server-id",`${l}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${l}`);let s=document.createElement("label");s.setAttribute("class","form-check-label"),s.setAttribute("for",`selectServer${l}`),s.innerHTML=`${E[t-1].nameServer}`,d.appendChild(n),d.appendChild(s),document.getElementById("ServerAddModule").appendChild(d)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let d=document.getElementById("moduleAddName").value,n=document.getElementById("moduleAddFile").value,s=document.querySelectorAll('input[name="flexRadioDefault"]'),r=document.querySelectorAll(".addModalCheckbox"),a=document.getElementById("userNameAddModule").value,c=document.getElementById("passwordAddModule").value;const u=[...s].some(i=>i.checked),v=[...r].some(i=>i.checked);d.length<3?p({text:"The module name is less than 3 characters."}).showToast():n==""?p({text:"No file has been selected."}).showToast():u==!1?p({text:"Select the desired module type."}).showToast():v==!1?p({text:"Select the desired server for the module."}).showToast():a.length<3?p({text:"The username is less than 3 characters."}).showToast():c.length<1&&p({text:"The password does not match the repeat field."}).showToast(),Ft()});async function Ft(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),s=document.getElementById("moduleAddTypeEPC");n.checked&&s.checked?d="Epc, 5gc":n.checked?d="5gc":s.checked&&(d="Epc");let r=document.querySelector('input[name="name_InputUserNameAddModule"]').value,a=document.querySelector('input[name="name_InputPasswordAddModule"]').value,c=[];document.querySelectorAll(".addModalCheckbox").forEach(i=>{i.checked&&c.push(Number(i.getAttribute("data-server-id")))});let u=new FormData;u.append("name",e),l&&u.append("config_file",l),u.append("type",d);let v=0;c.forEach(i=>{u.append(`server_id[${v}]`,i),v++}),u.append("username",r),u.append("password",a),await y({url:"create-module",method:"post",data:u,headers:{"Content-Type":"multipart/form-data"},callback:function(i){let g=[];console.log(i),C.push(i.data.created_modules[0].module.module_id);for(let m=0;m<i.data.created_modules.length;m++)g.push(i.data.created_modules[m].server.server_id);let w=document.createElement("tr");w.setAttribute("id",`tr${++P}`),w.setAttribute("data-id",`${i.data.created_modules[0].module.module_id}`),b.push({serverIDs:g,moduleID:i.data.created_modules[0].module.module_id,moduleType:[i.data.created_modules[0].module.module_type]});for(let m=1;m<=6;m++){let o=document.createElement("td");if(o.setAttribute("class",`td${m}`),m==1)o.innerHTML=C.length;else if(m==2)o.innerHTML=document.getElementById("moduleAddName").value;else if(m==3){let h=[];for(let f=0;f<i.data.created_modules.length;f++)h.push(i.data.created_modules[f].server.server_id);o.innerHTML=h.join(", ")}else if(m==4){let h=[];for(let f=0;f<1;f++)h.push(i.data.created_modules[f].module.module_type.toUpperCase());o.innerHTML=h.join(", ")}else if(m==5){o.setAttribute("class","td5 tdEditModule");let h=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${P}"
          data-id-modules = "${P}"
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
        </svg>`;o.insertAdjacentHTML("afterbegin",h)}else if(m==6){o.setAttribute("class","td5 tdRemoveModule");let h=`<svg 
          xmlns="http://www.w3.org/2000/svg"
         width="26" 
         height="26" 
         id="${P}"
         data-id-modules = "${P}"
         data-bs-toggle="modal"
         data-bs-target="#removeModule"
         fill="currentColor" 
         class="bi bi-trash3 deleteModuleClick cursorPointer"
         viewBox="0 0 16 16">
         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
         </svg>`;o.insertAdjacentHTML("afterbegin",h)}w.appendChild(o)}document.getElementById("tBody3").appendChild(w),Je(),Qe(),p({text:i.msg}).showToast()}}),document.getElementById("idLoading").style.display="none",Pe(),_e()}async function Xe(){await y({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function Ye(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await y({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function et(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const ve=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function oe(){return window.location.hash||He||qe(I[0])}const Rt=()=>{let e=oe();document.querySelector(e)&&(tt(e),ve(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ve(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){ve(oe()),tt(oe())})});let Ie=!0;function tt(e){let l=new URL(window.location).searchParams.get("log");if(T=Number(l),document.querySelectorAll(".tab-pane").forEach(d=>{d.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(d=>{d.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),Ie){switch(e){case"#v-servers-home":x(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":F(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":F(2),Te(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",Xe(),x(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":x(4),T==0&&(T=1),ue(T),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":x(5),Ge(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}Ie=!1}}
