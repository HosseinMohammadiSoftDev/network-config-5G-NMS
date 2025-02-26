import{T as g,u as f}from"./useApi-DirHI47I.js";import{s as Ne}from"./auth-CIdfLHBs.js";function me(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function pe(){for(let e=1;e<=5;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;B(e),_e(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e),Te()});function B(e){He(),pe(),me(),ve(),document.querySelector(".menus"+e).classList.add("activeMenu")}function ve(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;H(e)});function H(e){He(),pe(),me(),ve(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let j=!1,De=document.getElementById("showPasswordAddUser");De.addEventListener("click",function(){ze()});function ze(){j?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",j=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",j=!0)}let R=!1,Fe=document.getElementById("showPasswordEditUser");Fe.addEventListener("click",function(){je()});function je(){R?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",R=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",R=!0)}let V=!1,Re=document.getElementById("showPasswordShowConfig");Re.addEventListener("click",function(){Ve()});function Ve(){V?(document.getElementById("passwordShowConfig").type="password",V=!1):(document.getElementById("passwordShowConfig").type="text",V=!0)}let O=!1,Oe=document.getElementById("showPasswordDeletServer");Oe.addEventListener("click",function(){Ge()});function Ge(){O?(document.getElementById("passwordDeletServer").type="password",O=!1):(document.getElementById("passwordDeletServer").type="text",O=!0)}async function Je(){await f({url:"show-all-permission",callback:function(e){console.log(e);for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input accessLevelCheckbox"),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectAccessLevel${t+1}`),n.setAttribute("data-id",e.data[t]),n.setAttribute("required","required");let d=document.createElement("label");d.setAttribute("class","form-check-label"),d.setAttribute("for",`selectAccessLevel${t+1}`),d.innerHTML=`${e.data[t]}`,l.appendChild(d),l.appendChild(n),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input accessLevelCheckbox"),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectAccessLevelEdit${t+1}`),n.setAttribute("required","required");let d=document.createElement("label");d.setAttribute("class","form-check-label"),d.setAttribute("for",`selectAccessLevelEdit${t+1}`),d.innerHTML=`${e.data[t]}`,l.appendChild(d),l.appendChild(n),document.getElementById("divAccessLevelEdit").appendChild(l)}Ze()}})}Je();async function Ze(){await f({url:"show-all-roles",callback:function(e){console.log(e)}})}let We=document.getElementById("addUserModal");We.addEventListener("click",function(){X=[],ge=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),Y(),document.getElementById("selectAddUser").addEventListener("change",function(){this.value==="visitor"?document.getElementById("selectAccessLevel2").checked=!1:this.value==="expert"&&(document.getElementById("selectAccessLevel2").checked=!0)})});let X=[];function Ke(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){let t=document.querySelector(`label[for='${e.id}']`);X.push(t.innerHTML)}})}let Qe=document.getElementById("addTableUsers");Qe.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,n=document.getElementById("passwordAddUser").value,d=document.getElementById("repeatPasswordAddUser").value;e.length<3?g({text:"The name is less than 3 characters."}).showToast():t.length<3?g({text:"The last name is less than 3 characters."}).showToast():l.length<3?g({text:"The username is less than 3 characters."}).showToast():n.length<8?g({text:"The password is less than 8 characters."}).showToast():n!=d&&g({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&n.length>=8&&d.length>=8&&n===d&&(et(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Xe=document.getElementById("canselAddTableUser");Xe.addEventListener("click",function(){Y()});function Y(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const Ye=document.querySelectorAll(".accessLevelAdd");Ye.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let ge=0;async function et(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,n=document.getElementById("selectAddUser").value,d=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value,r=new FormData;r.append("first_name",e),r.append("last_name",t),r.append("auth_name",l),r.append("role",n),r.append("password",d),r.append("password_confirmation",a),Ke(),X.forEach(s=>{r.append(`permission_name[${ge++}]`,s)}),await f({method:"post",url:"add-member",data:r,headers:{"Content-Type":"multipart/form-data"},callback:function(s){A.push(s.data.user);let i=document.createElement("tr");i.setAttribute("id",`tr${s.data.user.id}`),i.setAttribute("data-id",`${s.data.user.id}`),L.push({id:s.data.user.id,name:s.data.user.first_name,family:s.data.user.last_name,authName:s.data.user.auth_name,permission:s.data.permission_name,role:s.data.role});for(let u=1;u<=8;u++){let m=document.createElement("td");if(m.setAttribute("class",`td${u}`),u==1)console.log(A.length),m.innerHTML=A.length;else if(u==2)m.innerHTML=document.getElementById("nameInputAddUser").value;else if(u==3)m.innerHTML=document.getElementById("familyInputAddUser").value;else if(u==4)m.innerHTML=document.getElementById("authNameInputAddUser").value;else if(u==5){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,m.appendChild(c),s.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):s.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(u==6){let c=`
            <button type="button" class="btn btn-secondary iconAccessLevel"  
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             id="${s.data.user.id}"
             data-id="permission_${s.data.user.id}"
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
            `;m.insertAdjacentHTML("afterbegin",c)}else if(u==7){let c=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",c)}else if(u==8){let c=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",c)}i.appendChild(m)}document.getElementById("tBody").appendChild(i),Y(),Ee(),fe(),g({text:s.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let tt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=tt;let nt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=nt;window.onload=function(){it()};let ae=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){ye();const e=this.dataset.id;H(e),document.getElementById("idLoading").style.display="flex"});let L=[],he,G=!1,se=1,A=[];async function ye(){if(G)return;G=!0,await f({url:"show-all-users?paginate=30",callback:function(t){se=1,L=[],ae&&(document.getElementById("tBody").innerHTML=""),ae=!0;let l=t.data.user.length;for(let n=0;n<l;n++){A.push(t.data.user[n]);let d=document.createElement("tr");d.setAttribute("id",`tr${t.data.user[n].id}`),d.setAttribute("data-id",`${t.data.user[n].id}`),L.push({id:t.data.user[n].id,name:t.data.user[n].first_name,family:t.data.user[n].last_name,authName:t.data.user[n].auth_name,permission:t.data.user[n].permissions,role:t.data.user[n].roles[0]});for(let a=1;a<=8;a++){let r=document.createElement("td");if(r.setAttribute("class",`td${a}`),a==1)r.innerHTML=se++;else if(a==2)r.innerHTML=t.data.user[n].first_name;else if(a==3)r.innerHTML=t.data.user[n].last_name;else if(a==4)r.innerHTML=t.data.user[n].auth_name;else if(a==5){let s=document.createElement("span");s.innerHTML=t.data.user[n].roles[0],r.appendChild(s),t.data.user[n].roles[0]=="admin"?s.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[n].roles[0]=="expert"?s.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[n].roles[0]=="visitor"&&s.setAttribute("class","badge text-bg-success fs-5")}else if(a==6){let s=`
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
            `;r.insertAdjacentHTML("afterbegin",s)}else if(a==7){let s=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}else if(a==8){let s=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}d.appendChild(r)}document.getElementById("tBody").appendChild(d)}e(t)}}),G=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,n=t.data.user;for(let d=0;d<l;d++)n[d].id}Ee(),fe()}function fe(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,he=t.id})})}let dt=document.getElementById("removeUserModalClick");dt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",at(he)});let ee;function Ee(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){document.getElementById("divShowPermission").innerHTML="";const l=L.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++){let d=l.permission[n],a=document.createElement("p");a.innerHTML=d,document.getElementById("divShowPermission").appendChild(a)}})}),e.forEach(t=>{t.addEventListener("click",function(){const l=L.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++)document.querySelectorAll("#divEditUsers input").forEach(a=>{a.checked=!1});for(let d=0;d<l.permission.length;d++){let a=l.permission[d];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(r=>{let s=document.querySelector(`label[for='${r.id}']`);if(a===s.innerHTML){let i=document.createElement("p");i.innerHTML=a,document.getElementById("divShowPermission").appendChild(i),console.log(a),r.checked=!0}})}ee=t;let n=L.find(d=>d.id==t.id);n!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=n.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=n.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=n.authName,document.getElementById("selectEditUser").value=n.role)})})}let lt=document.getElementById("addEditUser");lt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",st(ee.id)});async function at(e){await f({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),A=A.filter(d=>d.id!=t.data.id);for(let d=1;d<=A.length;d++){let a=A[d-1].id;document.querySelector(`[data-id="${a}"] .td1`).innerHTML=d}g({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function st(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,n=document.getElementById("familyInputEditUser").value,d=document.getElementById("authNameInputEditUser").value,a=document.getElementById("selectEditUser").value,r=document.getElementById("passwordEditUser").value,s=document.getElementById("repeatPasswordEditUser").value;await f({method:"put",url:"reset-password-and-auth-name",data:{first_name:l,last_name:n,user_id:t,auth_name:d,role:a,password:r,password_confirmation:s},callback:function(i){let u=L.findIndex(c=>c.id==ee.id);u!=-1&&(L[u].id=i.data.user.id,L[u].name=i.data.user.first_name,L[u].family=i.data.user.last_name,L[u].authName=i.data.user.auth_name,L[u].role=i.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=i.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=i.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=i.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=i.data.user.roles;let m=document.querySelector(`#tr${i.data.user.id} .td5 span`);m.innerHTML=="expert"?(m.classList.remove("text-bg-success"),m.classList.add("text-bg-primary")):m.innerHTML=="visitor"&&(m.classList.remove("text-bg-primary"),m.classList.add("text-bg-success")),g({text:i.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let b,we;function rt(e,t,l){const d=new Date().getTime()+l*24*60*60*1e3,a={value:t,expiry:d};localStorage.setItem(e,JSON.stringify(a))}function ot(e){const t=localStorage.getItem(e);if(!t)return null;const l=JSON.parse(t);return new Date().getTime()>l.expiry?(localStorage.removeItem(e),null):l.value}let E=[];async function it(){await f({url:"get-me",callback:function(l){Ne(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await f({url:"show-all-servers",callback:function(l){b=l.data;for(let n=0;n<l.data.length;n++)E.push({numberOfServers:l.data.length,nameServer:l.data[n].name,serverStatus:l.data[n].is_down});pt(b)}}),document.getElementById("idLoading").style.display="none",Bt();const e=document.querySelectorAll(".Server");be(e);const t=document.querySelectorAll(".editServer");Ie(t)}function be(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(n=>{n.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",ct(l)})}let T;function Ie(e){e.forEach(t=>{t.addEventListener("click",function(){let l=b.find(a=>a.id==this.dataset.id);we=this.dataset.id;let n=l.name,d=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=n,document.querySelector('input[name="nameEditIpServer"]').value=d})})}async function ct(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await f({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(n){rt("userData",{username:t,password:l},3),ot("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function ut(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await f({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(n){let d=0,a=n.data.name,r=n.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=r,b.find(i=>(d++,i.id==e))&&(b[d-1].name=a,b[d-1].ip=r),g({text:n.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let mt=document.getElementById("subServer");mt.addEventListener("click",function(){ut(we)});let P,N,Se,W,K,U,re;function pt(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(n=>{U=document.createElement("div"),e[t].is_down==0?U.className="info-box host col-3 ms-5":U.className="info-box off col-3 ms-5",U.setAttribute("data-server-id",`${e[t].id}`),t++,U.innerHTML=`
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
  `,l.appendChild(U)}),Le(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",vt(N)}),Be(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",gt(P)}),Ae(),document.getElementById("subDeletServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;n.length<3?g({text:"The name is less than 3 characters."}).showToast():d.length<8&&g({text:"The password is less than 8 characters."}).showToast(),n.length>=3&&d.length>=8&&(ht(Se),document.getElementById("idLoading").style.display="flex")}),yt(),Me(),document.getElementById("subAddServer").addEventListener("click",function(){let n=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value;n.length<3?g({text:"The name is less than 3 characters."}).showToast():d.length<7&&g({text:"The IP is less than 7 characters."}).showToast(),n.length>=3&&d.length>=7&&(ft(),document.getElementById("idLoading").style.display="flex")})}function Le(){re=document.querySelectorAll(".divIconPause"),re.forEach(e=>{e.addEventListener("click",function(){W=e.id,P=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Be(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){K=t.id,N=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function Ae(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Se=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function vt(e){await f({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=E.findIndex(d=>d.nameServer===t.data.name);l!==-1&&(E[l].serverStatus=0);let n=t.msg;document.getElementById(`${K}`).classList.remove("d-flex"),document.getElementById(`${K}`).classList.add("d-none"),document.getElementById(`iconPause${N}`).classList.remove("d-none"),document.getElementById(`iconPause${N}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),g({text:n}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function gt(e){await f({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,n=E.findIndex(d=>d.nameServer===t.data.name);n!==-1&&(E[n].serverStatus=1),document.getElementById(`${W}`).classList.remove("d-flex"),document.getElementById(`${W}`).classList.add("d-none"),document.getElementById(`iconPlay${P}`).classList.remove("d-none"),document.getElementById(`iconPlay${P}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),g({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function ht(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await f({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(n){E=E.filter(r=>r.nameServer!==n.data.name);let a=n.msg;document.querySelector(`.info-box[data-server-id='${n.data.id}']`).remove(),g({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function yt(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Me(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="",document.getElementById("addPathRunConfigServer").value=""})}async function ft(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,n=document.querySelector('input[name="nameAddPathConfigServer"]').value,d=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await f({method:"post",url:"create-server",data:{name:t,ip:l,path_config:n,path_run_config:d},callback:function(s){E.push({numberOfServers:E.length,nameServer:s.data.name}),b.push(s.data);const i=document.createElement("div");i.className="info-box host col-3 ms-5",i.setAttribute("data-server-id",`${s.data.id}`),i.innerHTML=`
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
  `,e.appendChild(i),Me(),g({text:s.msg}).showToast()}}),Le(),Be(),Ae();const a=document.querySelectorAll(".Server");be(a);const r=document.querySelectorAll(".editServer");Ie(r),document.getElementById("idLoading").style.display="none"}let oe=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",T==0&&(T=1),te(T);const e=this.dataset.id;B(e)});let ie,J=!1;async function te(e=1){if(J)return;J=!0;let t=[],l;await f({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(n){var i,u,m,c,h,I;t.push(n.data.data),oe&&(document.getElementById("tBody2").innerHTML=""),oe=!0;let d=Math.ceil(n.data.total/20),a;e==1,a=(e-1)*20,a++;let r=n.data.data.length;for(let p=0;p<r;p++){let o=document.createElement("tr");for(let v=1;v<=5;v++){let y=document.createElement("td");if(v==1)y.innerHTML=a++;else if(v==2){let S=document.createElement("span"),$=document.createElement("span");S.setAttribute("class","mx-2"),$.setAttribute("class","mx-2");let x=document.createElement("div");x.setAttribute("class","mt-2"),S.innerHTML=((u=(i=n.data.data[p].properties)==null?void 0:i.user)==null?void 0:u.first_name)||"-",$.innerHTML=((c=(m=n.data.data[p].properties)==null?void 0:m.user)==null?void 0:c.last_name)||"-",x.innerHTML=((I=(h=n.data.data[p].properties)==null?void 0:h.user)==null?void 0:I.auth_name)||"-",y.appendChild(S),y.appendChild($),y.appendChild(x),x.classList.add("fontSize")}else if(v==3)y.innerHTML=n.data.data[p].event;else if(v==4){y.innerHTML=n.data.data[p].description;const S=document.createElement("div");S.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${p} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,y.appendChild(S)}else if(v==5){let S=new Date(n.data.data[p].created_at).toLocaleString();y.innerHTML=S}o.appendChild(y)}document.getElementById("tBody2").appendChild(o)}l=d,s(l,ie);function s(p,o=T||1){const v=document.getElementById("pagination");if(v.innerHTML="",p!=1){const y=document.createElement("li");y.className=`page-item ${o===1?"disabled":""}`,y.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',v.appendChild(y);const S=document.createElement("li");S.className=`page-item ${o===1?"disabled":""}`,S.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,v.appendChild(S);const $=o===1?o:o-1,x=o===p?o:Math.min(o+1,p);for(let k=Math.max(1,$-1);k<=Math.min(p,x+1);k++){const F=document.createElement("li");F.className=`page-item ${k===o?"active":""}`,F.innerHTML=`<a class="page-link ${k===o?"active-page":""}" href="#" data-page="${k}">${k}</a>`,v.appendChild(F)}const D=document.createElement("li");D.className=`page-item ${o===p?"disabled":""}`,D.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,v.appendChild(D);const z=document.createElement("li");z.className=`page-item ${o===p?"disabled":""}`,z.innerHTML=`<a class="page-link" href="#" data-page="${p}">Last Page</a>`,v.appendChild(z);const le=new URL(window.location);le.searchParams.set("log",o||1),window.history.pushState({},"",le)}}}}),J=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(n=>{n.addEventListener("click",function(d){d.preventDefault();const a=parseInt(this.getAttribute("data-page"));!isNaN(a)&&a>0&&a<=l&&(document.getElementById("idLoading").style.display="flex",ie=a,te(a),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(n=>{n.addEventListener("click",function(){var a,r,s,i,u,m,c,h,I,p,o;let d=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][d].id,document.getElementById("logName").innerHTML=t[0][d].log_name,t[0][d].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((a=t[0][d].properties.member)==null?void 0:a.id)||"---",document.getElementById("authNameUser").innerHTML=((r=t[0][d].properties.member)==null?void 0:r.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((s=t[0][d].properties.member)==null?void 0:s.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((i=t[0][d].properties.member)==null?void 0:i.last_name)||"---"),t[0][d].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((u=t[0][d].properties)==null?void 0:u.password)||"---"),t[0][d].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((c=(m=t[0][d].properties)==null?void 0:m.server)==null?void 0:c.ip)||"---",document.getElementById("nameServer").innerHTML=((I=(h=t[0][d].properties)==null?void 0:h.server)==null?void 0:I.name)||"---"),t[0][d].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((p=t[0][d].properties)==null?void 0:p.module_name)||"---",document.getElementById("typeModule").innerHTML=((o=t[0][d].properties)==null?void 0:o.module_type)||"---")})})}let w=[],Z=!1,_,C,ce=1,M=[];async function Te(){document.getElementById("idLoading").style.display="flex",!Z&&(Z=!0,await f({url:"show-all-modules",callback:function(e){console.log(e),ce=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){M.push(e.module[l].module_id),C=l+1,w.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let n=document.createElement("tr");n.setAttribute("id",`tr${l+1}`),n.setAttribute("data-id",`${e.module[l].module_id}`);for(let d=1;d<=6;d++){let a=document.createElement("td");if(a.setAttribute("class",`td${d}`),d==1)a.innerHTML=ce++;else if(d==2)a.innerHTML=e.module[l].module_name;else if(d==3){let r;r=e.module[l].server_ids;let s=document.createElement("span"),i=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");s.innerHTML=i,a.appendChild(s)}else if(d==4){let r=e.module[l].module_type.toUpperCase(),s=JSON.stringify(r).replace(/[\[\]"\s\\]+/g,"");a.innerHTML=s}else if(d==5){let r=`<svg
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
        </svg>`;a.insertAdjacentHTML("afterbegin",r)}else if(d==6){let r=`<svg 
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
           </svg>`;a.insertAdjacentHTML("afterbegin",r)}n.appendChild(a)}document.getElementById("tBody3").appendChild(n)}}}),xe(),$e(),Z=!1,document.getElementById("idLoading").style.display="none")}document.getElementById("buttonIframe1").addEventListener("click",function(){ke("iframe_a","url_input_a"),qe()});document.getElementById("buttonIframe2").addEventListener("click",function(){ke("iframe_b","url_input_b"),qe()});function xe(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){_=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let n=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",wt(n),Et()})})}function ke(e,t){const l=document.getElementById(t),n=document.getElementsByName(e)[0];l&&n&&(n.src=l.value)}function Et(){let e;for(let d=0;d<w.length;d++)w[d].moduleID==ne&&(e=w[d].moduleType);const t=e.map(d=>d.toLowerCase()),l=document.getElementById("moduleTypeEPC"),n=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?n.checked=!0:n.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(n.checked=!0,l.checked=!0)}let ne,q=[];function wt(e){let t=w[e-1].serverIDs,l=t.length;ne=w[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let n=E.length;for(let d=1;d<=n;d++){let a=b[d-1].id,r=document.createElement("div");r.setAttribute("class","form-check");let s=document.createElement("input");s.setAttribute("class","form-check-input editModalCheckbox"),s.setAttribute("data-server-id",`${a}`),s.setAttribute("value",""),s.setAttribute("type","checkbox"),s.setAttribute("id",`selectServer${a}`);let i=document.createElement("label");i.setAttribute("class","form-check-label"),i.setAttribute("for",`selectServer${a}`),i.innerHTML=`${E[d-1].nameServer}`,r.appendChild(s),r.appendChild(i),document.getElementById("ServerEditModule").appendChild(r)}q=[];for(let d=0;d<l;d++)q.push(t[d]),document.getElementById(`selectServer${t[d]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",bt(ne)});async function bt(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,n=document.getElementById("moduleFile").files[0],d,a=document.getElementById("moduleType5GC"),r=document.getElementById("moduleTypeEPC");a.checked?d="5gc":r.checked&&(d="Epc");let s=document.querySelector('input[name="name_InputUserNameModule"]').value,i=document.querySelector('input[name="name_InputPasswordModule"]').value,u=[];document.querySelectorAll(".editModalCheckbox").forEach(h=>{h.checked&&u.push(Number(h.getAttribute("data-server-id")))});let m=new FormData;m.append("module_id",e),m.append("name",t),n&&m.append("config_file",n),m.append("type",d),u.forEach(h=>{m.append("server_ids[]",h)}),m.append("username",s),m.append("password",i);let c=document.getElementById("saveValue");await f({url:"edit-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(h){let I=h.module.module_server.length,p=h.module.module_server;for(let o=0;o<w.length;o++)if(w[o].moduleID==e){w[o].serverIDs.length=0;for(let v=0;v<p.length;v++)w[o].serverIDs.push(p[v])}for(let o=0;o<w.length;o++)w[o].moduleType.length=0,w[o].moduleID==e&&w[o].moduleType.push(h.module.module_type);q=[];for(let o=0;o<I;o++)q.push(h.module.module_server[o]),document.getElementById(`selectServer${p[o]}`).checked=!0;if(q.length===0)document.querySelector(`#tr${_} .td3`).innerHTML="";else{c.checked&&(localStorage.setItem("userNameServer",s),localStorage.setItem("passwordServer",i)),document.querySelector(`#tr${_} .td2`).innerHTML=h.module.module_name;let o=h.module.module_server,v=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${_} .td3`).innerHTML=v,document.querySelector(`#tr${_} .td4`).innerHTML=h.module.module_type.toUpperCase()}g({text:h.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ue,Ce;function $e(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,Ce=`#tr${e.id}`,Ue=w[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){It()});async function It(){await f({url:"delete-module",method:"delete",data:{module_id:Ue},callback:function(e){M=M.filter(l=>l!=e.module.id),document.querySelector(`${Ce}`).remove();for(let l=1;l<=M.length;l++){let n=M[l-1];document.querySelector(`[data-id="${n}"] .td1`).innerHTML=l}g({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(b),console.log(E),document.getElementById("ServerAddModule").innerHTML="",St();for(let l=0;l<E.length;l++)if(E[l].serverStatus==1){for(let n=0;n<E.length;n++)if(b[l].name==E[n].nameServer){console.log(b[l].id);let d=b[l].id;console.log(d),console.log(document.getElementById(`selectServer${d}`)),document.getElementById(`selectServer${d}`).disabled=!0}}});function St(){let e=E.length;for(let t=1;t<=e;t++){let l=b[t-1].id,n=document.createElement("div");n.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input addModalCheckbox"),d.setAttribute("data-server-id",`${l}`),d.setAttribute("value",""),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectServer${l}`);let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectServer${l}`),a.innerHTML=`${E[t-1].nameServer}`,n.appendChild(d),n.appendChild(a),document.getElementById("ServerAddModule").appendChild(n)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let n=document.getElementById("moduleAddName").value,d=document.getElementById("moduleAddFile").value,a=document.querySelectorAll('input[name="flexRadioDefault"]'),r=document.querySelectorAll(".addModalCheckbox"),s=document.getElementById("userNameAddModule").value,i=document.getElementById("passwordAddModule").value;const u=[...a].some(c=>c.checked),m=[...r].some(c=>c.checked);n.length<3?g({text:"The module name is less than 3 characters."}).showToast():d==""?g({text:"No file has been selected."}).showToast():u==!1?g({text:"Select the desired module type."}).showToast():m==!1?g({text:"Select the desired server for the module."}).showToast():s.length<3?g({text:"The username is less than 3 characters."}).showToast():i.length<1&&g({text:"The password does not match the repeat field."}).showToast(),n.length>=3&&d==""&&u==!1&&m==!1&&s.length>=3&&i.length>=1&&Lt()});async function Lt(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],n,d=document.getElementById("moduleAddType5GC"),a=document.getElementById("moduleAddTypeEPC");d.checked&&a.checked?n="Epc, 5gc":d.checked?n="5gc":a.checked&&(n="Epc");let r=document.querySelector('input[name="name_InputUserNameAddModule"]').value,s=document.querySelector('input[name="name_InputPasswordAddModule"]').value,i=[];document.querySelectorAll(".addModalCheckbox").forEach(c=>{c.checked&&i.push(Number(c.getAttribute("data-server-id")))});let u=new FormData;u.append("name",e),l&&u.append("config_file",l),u.append("type",n);let m=0;i.forEach(c=>{u.append(`server_id[${m}]`,c),m++}),u.append("username",r),u.append("password",s),await f({url:"create-module",method:"post",data:u,headers:{"Content-Type":"multipart/form-data"},callback:function(c){let h=[];console.log(c),M.push(c.data.created_modules[0].module.module_id);for(let p=0;p<c.data.created_modules.length;p++)h.push(c.data.created_modules[p].server.server_id);let I=document.createElement("tr");I.setAttribute("id",`tr${++C}`),I.setAttribute("data-id",`${c.data.created_modules[0].module.module_id}`),w.push({serverIDs:h,moduleID:c.data.created_modules[0].module.module_id,moduleType:[c.data.created_modules[0].module.module_type]});for(let p=1;p<=6;p++){let o=document.createElement("td");if(o.setAttribute("class",`td${p}`),p==1)o.innerHTML=M.length;else if(p==2)o.innerHTML=document.getElementById("moduleAddName").value;else if(p==3){let v=[];for(let y=0;y<c.data.created_modules.length;y++)v.push(c.data.created_modules[y].server.server_id);o.innerHTML=v.join(", ")}else if(p==4){let v=[];for(let y=0;y<1;y++)v.push(c.data.created_modules[y].module.module_type.toUpperCase());o.innerHTML=v.join(", ")}else if(p==5){let v=`<svg
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
        </svg>`;o.insertAdjacentHTML("afterbegin",v)}else if(p==6){let v=`<svg 
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
         </svg>`;o.insertAdjacentHTML("afterbegin",v)}I.appendChild(o)}document.getElementById("tBody3").appendChild(I),xe(),$e(),g({text:c.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function _e(){await f({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function qe(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await f({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function He(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const de=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function Q(){return window.location.hash||"#v-servers-home"}const Bt=()=>{let e=Q();document.querySelector(e)&&(Pe(e),de(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{de(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){de(Q()),Pe(Q())})});let ue=!0;function Pe(e){let l=new URL(window.location).searchParams.get("log");if(T=Number(l),document.querySelectorAll(".tab-pane").forEach(n=>{n.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(n=>{n.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),ue){switch(e){case"#v-servers-home":B(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":H(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":H(2),ye(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",_e(),B(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":B(4),te(T),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":B(5),Te(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}ue=!1}}
