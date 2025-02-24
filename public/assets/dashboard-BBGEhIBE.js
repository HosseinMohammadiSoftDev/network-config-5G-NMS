import{T as y,u as f}from"./useApi-sNEt-Mub.js";import{s as Pe}from"./auth-CIdfLHBs.js";function me(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function pe(){for(let e=1;e<=5;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),_e();const e=this.dataset.id;B(e),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e),Ae()});function B(e){He(),pe(),me(),ve(),document.querySelector(".menus"+e).classList.add("activeMenu")}function ve(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;q(e)});function q(e){He(),pe(),me(),ve(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let F=!1,Ne=document.getElementById("showPasswordAddUser");Ne.addEventListener("click",function(){De()});function De(){F?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",F=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",F=!0)}let R=!1,ze=document.getElementById("showPasswordEditUser");ze.addEventListener("click",function(){je()});function je(){R?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",R=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",R=!0)}let V=!1,Fe=document.getElementById("showPasswordShowConfig");Fe.addEventListener("click",function(){Re()});function Re(){V?(document.getElementById("passwordShowConfig").type="password",V=!1):(document.getElementById("passwordShowConfig").type="text",V=!0)}let O=!1,Ve=document.getElementById("showPasswordDeletServer");Ve.addEventListener("click",function(){Oe()});function Oe(){O?(document.getElementById("passwordDeletServer").type="password",O=!1):(document.getElementById("passwordDeletServer").type="text",O=!0)}async function Ge(){await f({url:"show-all-permission",callback:function(e){for(let t=0;t<=3;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input accessLevelCheckbox"),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectAccessLevel${t+1}`),n.setAttribute("required","required");let d=document.createElement("label");d.setAttribute("class","form-check-label"),d.setAttribute("for",`selectAccessLevel${t+1}`),d.innerHTML=`${e.data[t]}`,l.appendChild(d),l.appendChild(n),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<=3;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input accessLevelCheckbox"),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectAccessLevelEdit${t+1}`),n.setAttribute("required","required");let d=document.createElement("label");d.setAttribute("class","form-check-label"),d.setAttribute("for",`selectAccessLevelEdit${t+1}`),d.innerHTML=`${e.data[t]}`,l.appendChild(d),l.appendChild(n),document.getElementById("divAccessLevelEdit").appendChild(l)}}})}Ge();let Je=document.getElementById("addUserModal");Je.addEventListener("click",function(){X=[],ge=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),Y(),document.getElementById("selectAccessLevel2").checked=!0,document.getElementById("selectAddUser").addEventListener("change",function(){this.value==="visitor"?document.getElementById("selectAccessLevel2").checked=!1:this.value==="expert"&&(document.getElementById("selectAccessLevel2").checked=!0)})});let X=[];function Ze(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){let t=document.querySelector(`label[for='${e.id}']`);X.push(t.innerHTML)}})}let We=document.getElementById("addTableUsers");We.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,n=document.getElementById("passwordAddUser").value,d=document.getElementById("repeatPasswordAddUser").value;e.length<3?y({text:"The name is less than 3 characters."}).showToast():t.length<3?y({text:"The last name is less than 3 characters."}).showToast():l.length<3?y({text:"The username is less than 3 characters."}).showToast():n.length<8?y({text:"The password is less than 8 characters."}).showToast():n!=d&&y({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&n.length>=8&&d.length>=8&&n===d&&(Xe(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Ke=document.getElementById("canselAddTableUser");Ke.addEventListener("click",function(){Y()});function Y(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const Qe=document.querySelectorAll(".accessLevelAdd");Qe.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let ge=0;async function Xe(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,n=document.getElementById("selectAddUser").value,d=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value,s=new FormData;s.append("first_name",e),s.append("last_name",t),s.append("auth_name",l),s.append("role",n),s.append("password",d),s.append("password_confirmation",a),Ze(),X.forEach(r=>{s.append(`permission_name[${ge++}]`,r)}),await f({method:"post",url:"add-member",data:s,headers:{"Content-Type":"multipart/form-data"},callback:function(r){M.push(r.data.user);let i=document.createElement("tr");i.setAttribute("id",`tr${r.data.user.id}`),i.setAttribute("data-id",`${r.data.user.id}`),I.push({id:r.data.user.id,name:r.data.user.first_name,family:r.data.user.last_name,authName:r.data.user.auth_name,permission:r.data.permission_name,role:r.data.role});for(let m=1;m<=8;m++){let p=document.createElement("td");if(p.setAttribute("class",`td${m}`),m==1)p.innerHTML=M.length;else if(m==2)p.innerHTML=document.getElementById("nameInputAddUser").value;else if(m==3)p.innerHTML=document.getElementById("familyInputAddUser").value;else if(m==4)p.innerHTML=document.getElementById("authNameInputAddUser").value;else if(m==5){let u=document.createElement("span");u.innerHTML=document.getElementById("selectAddUser").value,p.appendChild(u),r.data.role=="expert"?u.setAttribute("class","badge text-bg-primary fs-5"):r.data.role=="visitor"&&u.setAttribute("class","badge text-bg-success fs-5")}else if(m==6){let u=`
            <button type="button" class="btn btn-secondary iconAccessLevel"  
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             id="${r.data.user.id}"
             data-id="permission_${r.data.user.id}"
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
            `;p.insertAdjacentHTML("afterbegin",u)}else if(m==7){let u=`<svg
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
        </svg>`;p.insertAdjacentHTML("afterbegin",u)}else if(m==8){let u=`<svg
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
        </svg>`;p.insertAdjacentHTML("afterbegin",u)}i.appendChild(p)}document.getElementById("tBody").appendChild(i),Y(),Ee(),fe(),y({text:r.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ye=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Ye;let et=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=et;window.onload=function(){rt()};let ae=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){ye();const e=this.dataset.id;q(e),document.getElementById("idLoading").style.display="flex"});let I=[],he,G=!1,se=1,M=[];async function ye(){if(G)return;G=!0,await f({url:"show-all-users?paginate=30",callback:function(t){se=1,I=[],ae&&(document.getElementById("tBody").innerHTML=""),ae=!0;let l=t.data.user.length;for(let n=0;n<l;n++){M.push(t.data.user[n]);let d=document.createElement("tr");d.setAttribute("id",`tr${t.data.user[n].id}`),d.setAttribute("data-id",`${t.data.user[n].id}`),I.push({id:t.data.user[n].id,name:t.data.user[n].first_name,family:t.data.user[n].last_name,authName:t.data.user[n].auth_name,permission:t.data.user[n].permissions,role:t.data.user[n].roles[0]});for(let a=1;a<=8;a++){let s=document.createElement("td");if(s.setAttribute("class",`td${a}`),a==1)s.innerHTML=se++;else if(a==2)s.innerHTML=t.data.user[n].first_name;else if(a==3)s.innerHTML=t.data.user[n].last_name;else if(a==4)s.innerHTML=t.data.user[n].auth_name;else if(a==5){let r=document.createElement("span");r.innerHTML=t.data.user[n].roles[0],s.appendChild(r),t.data.user[n].roles[0]=="admin"?r.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[n].roles[0]=="expert"?r.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[n].roles[0]=="visitor"&&r.setAttribute("class","badge text-bg-success fs-5")}else if(a==6){let r=`
            <button type="button" 
            id="${t.data.user[n].id}" 
            data-id="permission_${t.data.user[n].id}"
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
            `;s.insertAdjacentHTML("afterbegin",r)}else if(a==7){let r=`<svg
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
        </svg>`;s.insertAdjacentHTML("afterbegin",r)}else if(a==8){let r=`<svg
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
        </svg>`;s.insertAdjacentHTML("afterbegin",r)}d.appendChild(s)}document.getElementById("tBody").appendChild(d)}e(t)}}),G=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,n=t.data.user;for(let d=0;d<l;d++)n[d].id}Ee(),fe()}function fe(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,he=t.id})})}let tt=document.getElementById("removeUserModalClick");tt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",dt(he)});let ee;function Ee(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){document.getElementById("divShowPermission").innerHTML="";const l=I.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++){let d=l.permission[n],a=document.createElement("p");a.innerHTML=d,document.getElementById("divShowPermission").appendChild(a)}})}),e.forEach(t=>{t.addEventListener("click",function(){const l=I.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++)document.querySelectorAll("#divEditUsers input").forEach(a=>{a.checked=!1});for(let d=0;d<l.permission.length;d++){let a=l.permission[d];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(s=>{let r=document.querySelector(`label[for='${s.id}']`);if(a===r.innerHTML){let i=document.createElement("p");i.innerHTML=a,document.getElementById("divShowPermission").appendChild(i),console.log(a),s.checked=!0}})}ee=t;let n=I.find(d=>d.id==t.id);n!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=n.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=n.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=n.authName,document.getElementById("selectEditUser").value=n.role)})})}let nt=document.getElementById("addEditUser");nt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",lt(ee.id)});async function dt(e){await f({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),M=M.filter(d=>d.id!=t.data.id);for(let d=1;d<=M.length;d++){let a=M[d-1].id;document.querySelector(`[data-id="${a}"] .td1`).innerHTML=d}y({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function lt(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,n=document.getElementById("familyInputEditUser").value,d=document.getElementById("authNameInputEditUser").value,a=document.getElementById("selectEditUser").value,s=document.getElementById("passwordEditUser").value,r=document.getElementById("repeatPasswordEditUser").value;await f({method:"put",url:"reset-password-and-auth-name",data:{first_name:l,last_name:n,user_id:t,auth_name:d,role:a,password:s,password_confirmation:r},callback:function(i){let m=I.findIndex(u=>u.id==ee.id);m!=-1&&(I[m].id=i.data.user.id,I[m].name=i.data.user.first_name,I[m].family=i.data.user.last_name,I[m].authName=i.data.user.auth_name,I[m].role=i.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=i.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=i.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=i.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=i.data.user.roles;let p=document.querySelector(`#tr${i.data.user.id} .td5 span`);p.innerHTML=="expert"?(p.classList.remove("text-bg-success"),p.classList.add("text-bg-primary")):p.innerHTML=="visitor"&&(p.classList.remove("text-bg-primary"),p.classList.add("text-bg-success")),y({text:i.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let S,be;function at(e,t,l){const d=new Date().getTime()+l*24*60*60*1e3,a={value:t,expiry:d};localStorage.setItem(e,JSON.stringify(a))}function st(e){const t=localStorage.getItem(e);if(!t)return null;const l=JSON.parse(t);return new Date().getTime()>l.expiry?(localStorage.removeItem(e),null):l.value}let L=[];async function rt(){await f({url:"get-me",callback:function(d){Pe(d.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await f({url:"show-all-servers",callback:function(d){S=d.data;for(let a=0;a<d.data.length;a++)L.push({numberOfServers:d.data.length,nameServer:d.data[a].name});ut(S)}}),document.getElementById("idLoading").style.display="none",St();const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",ot(l)});const n=document.querySelectorAll(".editServer");we(n)}let T;function we(e){e.forEach(t=>{t.addEventListener("click",function(){let l=S.find(a=>a.id==this.dataset.id);be=this.dataset.id;let n=l.name,d=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=n,document.querySelector('input[name="nameEditIpServer"]').value=d})})}async function ot(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await f({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(n){at("userData",{username:t,password:l},3),st("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function it(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await f({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(n){let d=0,a=n.data.name,s=n.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=s,S.find(i=>(d++,i.id==e))&&(S[d-1].name=a,S[d-1].ip=s),y({text:n.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let ct=document.getElementById("subServer");ct.addEventListener("click",function(){it(be)});let P,N,Ie,W,K,U,re;function ut(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(n=>{U=document.createElement("div"),e[t].is_down==0?U.className="info-box host col-3 ms-5":U.className="info-box off col-3 ms-5",U.setAttribute("data-server-id",`${e[t].id}`),t++,U.innerHTML=`
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
  `,l.appendChild(U)}),Se(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",mt(N)}),Le(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",pt(P)}),Be(),document.getElementById("subDeletServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():d.length<8&&y({text:"The password is less than 8 characters."}).showToast(),n.length>=3&&d.length>=8&&(vt(Ie),document.getElementById("idLoading").style.display="flex")}),gt(),Me(),document.getElementById("subAddServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value;n.length<3?y({text:"The name is less than 3 characters."}).showToast():d.length<7&&y({text:"The IP is less than 7 characters."}).showToast(),n.length>=3&&d.length>=7&&(ht(),document.getElementById("idLoading").style.display="flex")})}function Se(){re=document.querySelectorAll(".divIconPause"),re.forEach(e=>{e.addEventListener("click",function(){W=e.id,P=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Le(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){K=t.id,N=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function Be(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Ie=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function mt(e){await f({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=t.msg;document.getElementById(`${K}`).classList.remove("d-flex"),document.getElementById(`${K}`).classList.add("d-none"),document.getElementById(`iconPause${N}`).classList.remove("d-none"),document.getElementById(`iconPause${N}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),y({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function pt(e){await f({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg;document.getElementById(`${W}`).classList.remove("d-flex"),document.getElementById(`${W}`).classList.add("d-none"),document.getElementById(`iconPlay${P}`).classList.remove("d-none"),document.getElementById(`iconPlay${P}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),y({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function vt(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await f({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(n){L=L.filter(s=>s.nameServer!==n.data.name);let a=n.msg;document.querySelector(`.info-box[data-server-id='${n.data.id}']`).remove(),y({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function gt(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Me(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="",document.getElementById("addPathRunConfigServer").value=""})}async function ht(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,n=document.querySelector('input[name="nameAddPathConfigServer"]').value,d=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await f({method:"post",url:"create-server",data:{name:t,ip:l,path_config:n,path_run_config:d},callback:function(s){L.push({numberOfServers:L.length,nameServer:s.data.name}),S.push(s.data);const r=document.createElement("div");r.className="info-box host col-3 ms-5",r.setAttribute("data-server-id",`${s.data.id}`),r.innerHTML=`
  <h5 id="nameServer${s.data.id}">${s.data.name}</h5>
  <p id="ipServer${s.data.id}">${s.data.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${s.data.id}"
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
      data-server-pause-id="${s.data.id}"
      id="iconPause${s.data.id}"
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
      data-server-play-id="${s.data.id}"
      id="iconPlay${s.data.id}"
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
      data-server-trash-id="${s.data.id}"
      id="iconRemoveServer${s.data.id}"
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
      data-id="${s.data.id}"
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
  `,e.appendChild(r),Me(),y({text:s.msg}).showToast()}}),Se(),Le(),Be();const a=document.querySelectorAll(".editServer");we(a),document.getElementById("idLoading").style.display="none"}let oe=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",T==0&&(T=1),te(T);const e=this.dataset.id;B(e)});let ie,J=!1;async function te(e=1){if(J)return;J=!0;let t=[],l;await f({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(n){var i,m,p,u,g,b;t.push(n.data.data),oe&&(document.getElementById("tBody2").innerHTML=""),oe=!0;let d=Math.ceil(n.data.total/20),a;e==1,a=(e-1)*20,a++;let s=n.data.data.length;for(let c=0;c<s;c++){let o=document.createElement("tr");for(let v=1;v<=5;v++){let h=document.createElement("td");if(v==1)h.innerHTML=a++;else if(v==2){let w=document.createElement("span"),_=document.createElement("span");w.setAttribute("class","mx-2"),_.setAttribute("class","mx-2");let x=document.createElement("div");x.setAttribute("class","mt-2"),w.innerHTML=((m=(i=n.data.data[c].properties)==null?void 0:i.user)==null?void 0:m.first_name)||"-",_.innerHTML=((u=(p=n.data.data[c].properties)==null?void 0:p.user)==null?void 0:u.last_name)||"-",x.innerHTML=((b=(g=n.data.data[c].properties)==null?void 0:g.user)==null?void 0:b.auth_name)||"-",h.appendChild(w),h.appendChild(_),h.appendChild(x),x.classList.add("fontSize")}else if(v==3)h.innerHTML=n.data.data[c].event;else if(v==4){h.innerHTML=n.data.data[c].description;const w=document.createElement("div");w.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${c} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,h.appendChild(w)}else if(v==5){let w=new Date(n.data.data[c].created_at).toLocaleString();h.innerHTML=w}o.appendChild(h)}document.getElementById("tBody2").appendChild(o)}l=d,r(l,ie);function r(c,o=T||1){const v=document.getElementById("pagination");if(v.innerHTML="",c!=1){const h=document.createElement("li");h.className=`page-item ${o===1?"disabled":""}`,h.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',v.appendChild(h);const w=document.createElement("li");w.className=`page-item ${o===1?"disabled":""}`,w.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,v.appendChild(w);const _=o===1?o:o-1,x=o===c?o:Math.min(o+1,c);for(let k=Math.max(1,_-1);k<=Math.min(c,x+1);k++){const j=document.createElement("li");j.className=`page-item ${k===o?"active":""}`,j.innerHTML=`<a class="page-link ${k===o?"active-page":""}" href="#" data-page="${k}">${k}</a>`,v.appendChild(j)}const D=document.createElement("li");D.className=`page-item ${o===c?"disabled":""}`,D.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,v.appendChild(D);const z=document.createElement("li");z.className=`page-item ${o===c?"disabled":""}`,z.innerHTML=`<a class="page-link" href="#" data-page="${c}">Last Page</a>`,v.appendChild(z);const le=new URL(window.location);le.searchParams.set("log",o||1),window.history.pushState({},"",le)}}}}),J=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(n=>{n.addEventListener("click",function(d){d.preventDefault();const a=parseInt(this.getAttribute("data-page"));!isNaN(a)&&a>0&&a<=l&&(document.getElementById("idLoading").style.display="flex",ie=a,te(a),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(n=>{n.addEventListener("click",function(){var a,s,r,i,m,p,u,g,b,c,o;let d=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][d].id,document.getElementById("logName").innerHTML=t[0][d].log_name,t[0][d].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((a=t[0][d].properties.member)==null?void 0:a.id)||"---",document.getElementById("authNameUser").innerHTML=((s=t[0][d].properties.member)==null?void 0:s.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((r=t[0][d].properties.member)==null?void 0:r.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((i=t[0][d].properties.member)==null?void 0:i.last_name)||"---"),t[0][d].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((m=t[0][d].properties)==null?void 0:m.password)||"---"),t[0][d].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((u=(p=t[0][d].properties)==null?void 0:p.server)==null?void 0:u.ip)||"---",document.getElementById("nameServer").innerHTML=((b=(g=t[0][d].properties)==null?void 0:g.server)==null?void 0:b.name)||"---"),t[0][d].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((c=t[0][d].properties)==null?void 0:c.module_name)||"---",document.getElementById("typeModule").innerHTML=((o=t[0][d].properties)==null?void 0:o.module_type)||"---")})})}let E=[],Z=!1,$,C,ce=1,A=[];async function Ae(){document.getElementById("idLoading").style.display="flex",!Z&&(Z=!0,await f({url:"show-all-modules",callback:function(e){console.log(e),ce=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){A.push(e.module[l].module_id),C=l+1,E.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let n=document.createElement("tr");n.setAttribute("id",`tr${l+1}`),n.setAttribute("data-id",`${e.module[l].module_id}`);for(let d=1;d<=6;d++){let a=document.createElement("td");if(a.setAttribute("class",`td${d}`),d==1)a.innerHTML=ce++;else if(d==2)a.innerHTML=e.module[l].module_name;else if(d==3){let s;s=e.module[l].server_ids;let r=document.createElement("span"),i=JSON.stringify(s).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");r.innerHTML=i,a.appendChild(r)}else if(d==4){let s=e.module[l].module_type.toUpperCase(),r=JSON.stringify(s).replace(/[\[\]"\s\\]+/g,"");a.innerHTML=r}else if(d==5){let s=`<svg
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
        </svg>`;a.insertAdjacentHTML("afterbegin",s)}else if(d==6){let s=`<svg 
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
           </svg>`;a.insertAdjacentHTML("afterbegin",s)}n.appendChild(a)}document.getElementById("tBody3").appendChild(n)}}}),Te(),Ce(),Z=!1,document.getElementById("idLoading").style.display="none")}document.getElementById("buttonIframe1").addEventListener("click",function(){xe("iframe_a","url_input_a"),$e()});document.getElementById("buttonIframe2").addEventListener("click",function(){xe("iframe_b","url_input_b"),$e()});function Te(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){$=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let n=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",ft(n),yt()})})}function xe(e,t){const l=document.getElementById(t),n=document.getElementsByName(e)[0];l&&n&&(n.src=l.value)}function yt(){let e;for(let d=0;d<E.length;d++)E[d].moduleID==ne&&(e=E[d].moduleType);const t=e.map(d=>d.toLowerCase()),l=document.getElementById("moduleTypeEPC"),n=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?n.checked=!0:n.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(n.checked=!0,l.checked=!0)}let ne,H=[];function ft(e){let t=E[e-1].serverIDs,l=t.length;ne=E[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let n=L.length;for(let d=1;d<=n;d++){let a=S[d-1].id,s=document.createElement("div");s.setAttribute("class","form-check");let r=document.createElement("input");r.setAttribute("class","form-check-input editModalCheckbox"),r.setAttribute("data-server-id",`${a}`),r.setAttribute("value",""),r.setAttribute("type","checkbox"),r.setAttribute("id",`selectServer${a}`);let i=document.createElement("label");i.setAttribute("class","form-check-label"),i.setAttribute("for",`selectServer${a}`),i.innerHTML=`${L[d-1].nameServer}`,s.appendChild(r),s.appendChild(i),document.getElementById("ServerEditModule").appendChild(s)}H=[];for(let d=0;d<l;d++)H.push(t[d]),document.getElementById(`selectServer${t[d]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Et(ne)});async function Et(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,n=document.getElementById("moduleFile").files[0],d,a=document.getElementById("moduleType5GC"),s=document.getElementById("moduleTypeEPC");a.checked?d="5gc":s.checked&&(d="Epc");let r=document.querySelector('input[name="name_InputUserNameModule"]').value,i=document.querySelector('input[name="name_InputPasswordModule"]').value,m=[];document.querySelectorAll(".editModalCheckbox").forEach(g=>{g.checked&&m.push(Number(g.getAttribute("data-server-id")))});let p=new FormData;p.append("module_id",e),p.append("name",t),n&&p.append("config_file",n),p.append("type",d),m.forEach(g=>{p.append("server_ids[]",g)}),p.append("username",r),p.append("password",i);let u=document.getElementById("saveValue");await f({url:"edit-module",method:"post",data:p,headers:{"Content-Type":"multipart/form-data"},callback:function(g){let b=g.module.module_server.length,c=g.module.module_server;for(let o=0;o<E.length;o++)if(E[o].moduleID==e){E[o].serverIDs.length=0;for(let v=0;v<c.length;v++)E[o].serverIDs.push(c[v])}for(let o=0;o<E.length;o++)E[o].moduleType.length=0,E[o].moduleID==e&&E[o].moduleType.push(g.module.module_type);H=[];for(let o=0;o<b;o++)H.push(g.module.module_server[o]),document.getElementById(`selectServer${c[o]}`).checked=!0;if(H.length===0)document.querySelector(`#tr${$} .td3`).innerHTML="";else{u.checked&&(localStorage.setItem("userNameServer",r),localStorage.setItem("passwordServer",i)),document.querySelector(`#tr${$} .td2`).innerHTML=g.module.module_name;let o=g.module.module_server,v=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${$} .td3`).innerHTML=v,document.querySelector(`#tr${$} .td4`).innerHTML=g.module.module_type.toUpperCase()}y({text:g.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let ke,Ue;function Ce(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,Ue=`#tr${e.id}`,ke=E[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){bt()});async function bt(){await f({url:"delete-module",method:"delete",data:{module_id:ke},callback:function(e){A=A.filter(l=>l!=e.module.id),document.querySelector(`${Ue}`).remove();for(let l=1;l<=A.length;l++){let n=A[l-1];document.querySelector(`[data-id="${n}"] .td1`).innerHTML=l}y({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),document.getElementById("ServerAddModule").innerHTML="",wt()});function wt(){let e=L.length;for(let t=1;t<=e;t++){let l=S[t-1].id,n=document.createElement("div");n.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input addModalCheckbox"),d.setAttribute("data-server-id",`${l}`),d.setAttribute("value",""),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectServer${l}`);let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectServer${l}`),a.innerHTML=`${L[t-1].nameServer}`,n.appendChild(d),n.appendChild(a),document.getElementById("ServerAddModule").appendChild(n)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t)),It()});async function It(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],n,d=document.getElementById("moduleAddType5GC"),a=document.getElementById("moduleAddTypeEPC");d.checked&&a.checked?n="Epc, 5gc":d.checked?n="5gc":a.checked&&(n="Epc");let s=document.querySelector('input[name="name_InputUserNameAddModule"]').value,r=document.querySelector('input[name="name_InputPasswordAddModule"]').value,i=[];document.querySelectorAll(".addModalCheckbox").forEach(u=>{u.checked&&i.push(Number(u.getAttribute("data-server-id")))});let m=new FormData;m.append("name",e),l&&m.append("config_file",l),m.append("type",n);let p=0;i.forEach(u=>{m.append(`server_id[${p}]`,u),p++}),m.append("username",s),m.append("password",r),await f({url:"create-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(u){let g=[];console.log(u),A.push(u.data.created_modules[0].module.module_id);for(let c=0;c<u.data.created_modules.length;c++)g.push(u.data.created_modules[c].server.server_id);let b=document.createElement("tr");b.setAttribute("id",`tr${++C}`),b.setAttribute("data-id",`${u.data.created_modules[0].module.module_id}`),E.push({serverIDs:g,moduleID:u.data.created_modules[0].module.module_id,moduleType:[u.data.created_modules[0].module.module_type]});for(let c=1;c<=6;c++){let o=document.createElement("td");if(o.setAttribute("class",`td${c}`),c==1)o.innerHTML=A.length;else if(c==2)o.innerHTML=document.getElementById("moduleAddName").value;else if(c==3){let v=[];for(let h=0;h<u.data.created_modules.length;h++)v.push(u.data.created_modules[h].server.server_id);o.innerHTML=v.join(", ")}else if(c==4){let v=[];for(let h=0;h<1;h++)v.push(u.data.created_modules[h].module.module_type.toUpperCase());o.innerHTML=v.join(", ")}else if(c==5){let v=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${C}"
          data-id-modules = "${C}"
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
        </svg>`;o.insertAdjacentHTML("afterbegin",v)}else if(c==6){let v=`<svg 
          xmlns="http://www.w3.org/2000/svg"
         width="26" 
         height="26" 
         id="${C}"
         data-id-modules = "${C}"
         data-bs-toggle="modal"
         data-bs-target="#removeModule"
         fill="currentColor" 
         class="bi bi-trash3 deleteModuleClick cursorPointer"
         viewBox="0 0 16 16">
         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
         </svg>`;o.insertAdjacentHTML("afterbegin",v)}b.appendChild(o)}document.getElementById("tBody3").appendChild(b),Te(),Ce(),y({text:u.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function _e(){await f({url:"show-address",callback:function(e){console.log(e),e.length>0&&(console.log("00"),document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function $e(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await f({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function He(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const de=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function Q(){return window.location.hash||"#v-servers-home"}const St=()=>{let e=Q();document.querySelector(e)&&(qe(e),de(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{de(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){de(Q()),qe(Q())})});let ue=!0;function qe(e){let l=new URL(window.location).searchParams.get("log");if(T=Number(l),document.querySelectorAll(".tab-pane").forEach(n=>{n.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(n=>{n.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),ue){switch(e){case"#v-servers-home":B(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":q(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":q(2),ye(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":B(3),_e(),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoading").style.display="none",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":B(4),te(T),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":B(5),Ae(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}ue=!1}}
