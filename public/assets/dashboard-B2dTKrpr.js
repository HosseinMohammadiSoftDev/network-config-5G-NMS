import{T as p,u as y}from"./useApi-Mgb1BH1A.js";import{s as Xe}from"./auth-CIdfLHBs.js";function D(e){for(let t=1;t<=e;t++)document.querySelector(".subMenu"+t).classList.remove("clickSubMenu")}let A=[1,2,3,4,5];function Ee(){for(let e=1;e<=A.length;e++)document.querySelector(".menus"+A[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;B(e),Je(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;B(e),Fe()});function B(e){Ke(),Ee(),D(),be(),document.querySelector(".menus"+e).classList.add("activeMenu")}function be(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;z(e)});function z(e){Ke(),Ee(),D(),be(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let G=!1,Ye=document.getElementById("showPasswordAddUser");Ye.addEventListener("click",function(){et()});function et(){G?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",G=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",G=!0)}let J=!1,tt=document.getElementById("showPasswordEditUser");tt.addEventListener("click",function(){dt()});function dt(){J?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",J=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",J=!0)}let Z=!1,lt=document.getElementById("showPasswordShowConfig");lt.addEventListener("click",function(){nt()});function nt(){Z?(document.getElementById("passwordShowConfig").type="password",Z=!1):(document.getElementById("passwordShowConfig").type="text",Z=!0)}let K=!1,at=document.getElementById("showPasswordDeletServer");at.addEventListener("click",function(){st()});function st(){K?(document.getElementById("passwordDeletServer").type="password",K=!1):(document.getElementById("passwordDeletServer").type="text",K=!0)}async function we(){await y({url:"show-all-permission",callback:function(e){document.getElementById("showAccessLevel").innerHTML="";for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevel${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevel${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevelEdit${t+1}`),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevelEdit${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("divAccessLevelEdit").appendChild(l)}}})}we();let Ie,ee,R=[],x;async function ne(){await y({url:"show-all-roles",callback:function(e){e.data[0],Ie=e.data[1],ee=e.data[2],x=document.querySelectorAll('input[type="checkbox"][data-id]'),R=[],x.forEach(t=>{R.push(t.getAttribute("data-id")),console.log(t)}),x.forEach(t=>{ee.permissions.some(d=>d.name===t.getAttribute("data-id"))&&(t.checked=!0),t.disabled=!1})}})}document.getElementById("selectAddUser").addEventListener("change",function(){x.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(Ie.permissions.forEach(e=>{R.includes(e.name)&&x.forEach(t=>{t.getAttribute("data-id")===e.name&&(t.checked=!0)})}),x.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&ee.permissions.forEach(e=>{R.includes(e.name)&&x.forEach(t=>{t.getAttribute("data-id")===e.name&&(t.checked=!0,t.disabled=!1)})})});ne();let rt=document.getElementById("addUserModal");rt.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",ae=[],Se=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),se(),ne()});let ae=[];function ot(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){let t=document.querySelector(`label[for='${e.id}']`);ae.push(t.innerHTML)}})}let it=document.getElementById("addTableUsers");it.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?p({text:"The name is less than 3 characters."}).showToast():t.length<3?p({text:"The last name is less than 3 characters."}).showToast():l.length<3?p({text:"The username is less than 3 characters."}).showToast():d.length<8?p({text:"The password is less than 8 characters."}).showToast():d!=n&&p({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&d.length>=8&&n.length>=8&&d===n&&(mt(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let ct=document.getElementById("canselAddTableUser");ct.addEventListener("click",function(){se()});function se(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const ut=document.querySelectorAll(".accessLevelAdd");ut.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let Se=0;async function mt(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value,r=new FormData;r.append("first_name",e),r.append("last_name",t),r.append("auth_name",l),r.append("role",d),r.append("password",n),r.append("password_confirmation",a),ot(),ae.forEach(s=>{r.append(`permission_name[${Se++}]`,s)}),await y({method:"post",url:"add-member",data:r,headers:{"Content-Type":"multipart/form-data"},callback:function(s){T.push(s.data.user);let i=document.createElement("tr");i.setAttribute("id",`tr${s.data.user.id}`),i.setAttribute("data-id",`${s.data.user.id}`),M.push({id:s.data.user.id,name:s.data.user.first_name,family:s.data.user.last_name,authName:s.data.user.auth_name,permission:s.data.permission_name,role:s.data.role});for(let m=1;m<=8;m++){let v=document.createElement("td");if(v.setAttribute("class",`td${m}`),m==1)console.log(T.length),v.innerHTML=T.length;else if(m==2)v.innerHTML=document.getElementById("nameInputAddUser").value;else if(m==3)v.innerHTML=document.getElementById("familyInputAddUser").value;else if(m==4)v.innerHTML=document.getElementById("authNameInputAddUser").value;else if(m==5){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,v.appendChild(c),s.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):s.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(m==6){let c=`
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
            `;v.insertAdjacentHTML("afterbegin",c)}else if(m==7){let c=`<svg
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
        </svg>`;v.insertAdjacentHTML("afterbegin",c)}else if(m==8){let c=`<svg
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
        </svg>`;v.insertAdjacentHTML("afterbegin",c)}i.appendChild(v)}document.getElementById("tBody").appendChild(i),se(),Be(),Ae(),p({text:s.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let vt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=vt;let gt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=gt;window.onload=function(){wt()};let me=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){we(),Me();const e=this.dataset.id;z(e),document.getElementById("idLoading").style.display="flex"});let M=[],Le,Q=!1,ve=1,T=[];async function Me(){if(Q)return;Q=!0,await y({url:"show-all-users?paginate=30",callback:function(t){ve=1,M=[],me&&(document.getElementById("tBody").innerHTML=""),me=!0;let l=t.data.user.length;for(let d=0;d<l;d++){T.push(t.data.user[d]);let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),n.setAttribute("data-id",`${t.data.user[d].id}`),M.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,permission:t.data.user[d].permissions,role:t.data.user[d].roles[0]});for(let a=1;a<=8;a++){let r=document.createElement("td");if(r.setAttribute("class",`td${a}`),a==1)r.innerHTML=ve++;else if(a==2)r.innerHTML=t.data.user[d].first_name;else if(a==3)r.innerHTML=t.data.user[d].last_name;else if(a==4)r.innerHTML=t.data.user[d].auth_name;else if(a==5){let s=document.createElement("span");s.innerHTML=t.data.user[d].roles[0],r.appendChild(s),t.data.user[d].roles[0]=="admin"?s.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?s.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&s.setAttribute("class","badge text-bg-success fs-5")}else if(a==6){let s=`
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
            `;r.insertAdjacentHTML("afterbegin",s)}else if(a==7){let s=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}else if(a==8){let s=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}n.appendChild(r)}document.getElementById("tBody").appendChild(n)}e(t)}}),Q=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,d=t.data.user;for(let n=0;n<l;n++)d[n].id}Be(),Ae()}function Ae(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,Le=t.id})})}let pt=document.getElementById("removeUserModalClick");pt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",ft(Le)});let re;function Be(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){document.getElementById("divShowPermission").innerHTML="";const l=M.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++){let n=l.permission[d],a=document.createElement("p");a.innerHTML=n,document.getElementById("divShowPermission").appendChild(a)}})}),e.forEach(t=>{t.addEventListener("click",function(){const l=M.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++)document.querySelectorAll("#divEditUsers input").forEach(a=>{a.checked=!1});for(let n=0;n<l.permission.length;n++){let a=l.permission[n];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(r=>{let s=document.querySelector(`label[for='${r.id}']`);if(a===s.innerHTML){let i=document.createElement("p");i.innerHTML=a,document.getElementById("divShowPermission").appendChild(i),console.log(a),r.checked=!0}})}re=t;let d=M.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role)})})}let ht=document.getElementById("addEditUser");ht.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",yt(re.id)});async function ft(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),T=T.filter(n=>n.id!=t.data.id);for(let n=1;n<=T.length;n++){let a=T[n-1].id;document.querySelector(`[data-id="${a}"] .td1`).innerHTML=n}p({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function yt(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,a=document.getElementById("selectEditUser").value,r=document.getElementById("passwordEditUser").value,s=document.getElementById("repeatPasswordEditUser").value;await y({method:"put",url:"reset-password-and-auth-name",data:{first_name:l,last_name:d,user_id:t,auth_name:n,role:a,password:r,password_confirmation:s},callback:function(i){let m=M.findIndex(c=>c.id==re.id);m!=-1&&(M[m].id=i.data.user.id,M[m].name=i.data.user.first_name,M[m].family=i.data.user.last_name,M[m].authName=i.data.user.auth_name,M[m].role=i.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=i.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=i.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=i.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=i.data.user.roles;let v=document.querySelector(`#tr${i.data.user.id} .td5 span`);v.innerHTML=="expert"?(v.classList.remove("text-bg-success"),v.classList.add("text-bg-primary")):v.innerHTML=="visitor"&&(v.classList.remove("text-bg-primary"),v.classList.add("text-bg-success")),p({text:i.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let I,Te;function Et(e,t,l){const n=new Date().getTime()+l*24*60*60*1e3,a={value:t,expiry:n};localStorage.setItem(e,JSON.stringify(a))}function bt(e){const t=localStorage.getItem(e);if(!t)return null;const l=JSON.parse(t);return new Date().getTime()>l.expiry?(localStorage.removeItem(e),null):l.value}let b=[],E,xe=!1,ke=!1;function Ue(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let Ce="";async function wt(){await y({url:"get-me",callback:function(l){E=l.data.user.permissions,Xe(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(l){I=l.data;for(let d=0;d<l.data.length;d++)b.push({numberOfServers:l.data.length,nameServer:l.data[d].name,serverStatus:l.data[d].is_down});Mt(I)}}),document.getElementById("idLoading").style.display="none",Pt();const e=document.querySelectorAll(".Server");_e(e);const t=document.querySelectorAll(".editServer");He(t);for(let l=0;l<E.length;l++){let d=E[l];E.includes(d)&&console.log(E[l])}Ce=Ue(E[0]),E.includes("user")?D(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),D(1)),E.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),A=A.filter(l=>l!=1)),E.includes("VM/create")||document.getElementById("iconAddServer").remove(),E.includes("VM/update")||document.querySelectorAll(".editServer").forEach(l=>{l.remove()}),E.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.remove()}),E.includes("module/read")||(document.getElementById("v-module-tab").remove(),A=A.filter(l=>l!=5)),E.includes("module/create")||document.getElementById("addModal").remove(),E.includes("module/update")||(xe=!0,document.getElementById("thEditModule").remove()),E.includes("module/delete")||(ke=!0,document.getElementById("thRemoveModule").remove()),E.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(l=>{l.remove()}),document.querySelectorAll(".divIconPlay").forEach(l=>{l.remove()})),E.includes("log")||(document.getElementById("v-log-tab").remove(),A=A.filter(l=>l!=4)),E.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),A=A.filter(l=>l!=3))}function qe(){xe&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function $e(){ke&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function _e(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",It(l)})}let U;function He(e){e.forEach(t=>{t.addEventListener("click",function(){let l=I.find(a=>a.id==this.dataset.id);Te=this.dataset.id;let d=l.name,n=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function It(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(d){Et("userData",{username:t,password:l},3),bt("userData"),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none",ne()}async function St(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(d){let n=0,a=d.data.name,r=d.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=r,I.find(i=>(n++,i.id==e))&&(I[n-1].name=a,I[n-1].ip=r),p({text:d.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Lt=document.getElementById("subServer");Lt.addEventListener("click",function(){St(Te)});let F,V,Pe,te,de,$,ge;function Mt(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(d=>{$=document.createElement("div"),e[t].is_down==0?$.className="info-box host col-3 ms-5":$.className="info-box off col-3 ms-5",$.setAttribute("data-server-id",`${e[t].id}`),t++,$.innerHTML=`
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
  `,l.appendChild($)}),Ne(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",At(V)}),De(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Bt(F)}),ze(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?p({text:"The name is less than 3 characters."}).showToast():n.length<8&&p({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Tt(Pe),document.getElementById("idLoading").style.display="flex")}),xt(),Re(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?p({text:"The name is less than 3 characters."}).showToast():n.length<7&&p({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(kt(),document.getElementById("idLoading").style.display="flex")})}function Ne(){ge=document.querySelectorAll(".divIconPause"),ge.forEach(e=>{e.addEventListener("click",function(){te=e.id,F=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function De(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){de=t.id,V=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function ze(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Pe=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function At(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=b.findIndex(n=>n.nameServer===t.data.name);l!==-1&&(b[l].serverStatus=0);let d=t.msg;document.getElementById(`${de}`).classList.remove("d-flex"),document.getElementById(`${de}`).classList.add("d-none"),document.getElementById(`iconPause${V}`).classList.remove("d-none"),document.getElementById(`iconPause${V}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),p({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Bt(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,d=b.findIndex(n=>n.nameServer===t.data.name);d!==-1&&(b[d].serverStatus=1),document.getElementById(`${te}`).classList.remove("d-flex"),document.getElementById(`${te}`).classList.add("d-none"),document.getElementById(`iconPlay${F}`).classList.remove("d-none"),document.getElementById(`iconPlay${F}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),p({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Tt(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(d){b=b.filter(r=>r.nameServer!==d.data.name);let a=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),p({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function xt(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Re(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="",document.getElementById("addPathRunConfigServer").value=""})}async function kt(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,d=document.querySelector('input[name="nameAddPathConfigServer"]').value,n=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:l,path_config:d,path_run_config:n},callback:function(s){b.push({numberOfServers:b.length,nameServer:s.data.name}),I.push(s.data);const i=document.createElement("div");i.className="info-box host col-3 ms-5",i.setAttribute("data-server-id",`${s.data.id}`),i.innerHTML=`
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
  `,e.appendChild(i),Re(),p({text:s.msg}).showToast()}}),Ne(),De(),ze();const a=document.querySelectorAll(".Server");_e(a);const r=document.querySelectorAll(".editServer");He(r),document.getElementById("idLoading").style.display="none"}let pe=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",U==0&&(U=1),oe(U);const e=this.dataset.id;B(e)});let he,X=!1;async function oe(e=1){if(X)return;X=!0;let t=[],l;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var i,m,v,c,h,S;t.push(d.data.data),pe&&(document.getElementById("tBody2").innerHTML=""),pe=!0;let n=Math.ceil(d.data.total/20),a;e==1,a=(e-1)*20,a++;let r=d.data.data.length;for(let u=0;u<r;u++){let o=document.createElement("tr");for(let g=1;g<=5;g++){let f=document.createElement("td");if(g==1)f.innerHTML=a++;else if(g==2){let L=document.createElement("span"),H=document.createElement("span");L.setAttribute("class","mx-2"),H.setAttribute("class","mx-2");let C=document.createElement("div");C.setAttribute("class","mt-2"),L.innerHTML=((m=(i=d.data.data[u].properties)==null?void 0:i.user)==null?void 0:m.first_name)||"-",H.innerHTML=((c=(v=d.data.data[u].properties)==null?void 0:v.user)==null?void 0:c.last_name)||"-",C.innerHTML=((S=(h=d.data.data[u].properties)==null?void 0:h.user)==null?void 0:S.auth_name)||"-",f.appendChild(L),f.appendChild(H),f.appendChild(C),C.classList.add("fontSize")}else if(g==3)f.innerHTML=d.data.data[u].event;else if(g==4){f.innerHTML=d.data.data[u].description;const L=document.createElement("div");L.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${u} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,f.appendChild(L)}else if(g==5){let L=new Date(d.data.data[u].created_at).toLocaleString();f.innerHTML=L}o.appendChild(f)}document.getElementById("tBody2").appendChild(o)}l=n,s(l,he);function s(u,o=U||1){const g=document.getElementById("pagination");if(g.innerHTML="",u!=1){const f=document.createElement("li");f.className=`page-item ${o===1?"disabled":""}`,f.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',g.appendChild(f);const L=document.createElement("li");L.className=`page-item ${o===1?"disabled":""}`,L.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,g.appendChild(L);const H=o===1?o:o-1,C=o===u?o:Math.min(o+1,u);for(let q=Math.max(1,H-1);q<=Math.min(u,C+1);q++){const O=document.createElement("li");O.className=`page-item ${q===o?"active":""}`,O.innerHTML=`<a class="page-link ${q===o?"active-page":""}" href="#" data-page="${q}">${q}</a>`,g.appendChild(O)}const j=document.createElement("li");j.className=`page-item ${o===u?"disabled":""}`,j.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,g.appendChild(j);const W=document.createElement("li");W.className=`page-item ${o===u?"disabled":""}`,W.innerHTML=`<a class="page-link" href="#" data-page="${u}">Last Page</a>`,g.appendChild(W);const ue=new URL(window.location);ue.searchParams.set("log",o||1),window.history.pushState({},"",ue)}}}}),X=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const a=parseInt(this.getAttribute("data-page"));!isNaN(a)&&a>0&&a<=l&&(document.getElementById("idLoading").style.display="flex",he=a,oe(a),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){var a,r,s,i,m,v,c,h,S,u,o;let n=this.dataset.idLog;document.getElementById("id").innerHTML=t[0][n].id,document.getElementById("logName").innerHTML=t[0][n].log_name,t[0][n].properties.member===void 0?document.getElementById("divMember").style.display="none":(document.getElementById("divMember").style.display="block",document.getElementById("idUser").innerHTML=((a=t[0][n].properties.member)==null?void 0:a.id)||"---",document.getElementById("authNameUser").innerHTML=((r=t[0][n].properties.member)==null?void 0:r.auth_name)||"---",document.getElementById("firstNameUser").innerHTML=((s=t[0][n].properties.member)==null?void 0:s.first_name)||"---",document.getElementById("lastNameUser").innerHTML=((i=t[0][n].properties.member)==null?void 0:i.last_name)||"---"),t[0][n].properties.password===void 0?document.getElementById("divPassword").style.display="none":(document.getElementById("divPassword").style.display="block",document.getElementById("password").innerHTML=((m=t[0][n].properties)==null?void 0:m.password)||"---"),t[0][n].properties.server===void 0?document.getElementById("divServer").style.display="none":(document.getElementById("divServer").style.display="block",document.getElementById("ipServer").innerHTML=((c=(v=t[0][n].properties)==null?void 0:v.server)==null?void 0:c.ip)||"---",document.getElementById("nameServer").innerHTML=((S=(h=t[0][n].properties)==null?void 0:h.server)==null?void 0:S.name)||"---"),t[0][n].properties.module_name===void 0?document.getElementById("divConfigServer").style.display="none":(document.getElementById("divConfigServer").style.display="block",document.getElementById("nameModule").innerHTML=((u=t[0][n].properties)==null?void 0:u.module_name)||"---",document.getElementById("typeModule").innerHTML=((o=t[0][n].properties)==null?void 0:o.module_type)||"---")})})}let w=[],Y=!1,P,_,fe=1,k=[];async function Fe(){document.getElementById("idLoading").style.display="flex",!Y&&(Y=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),fe=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){k.push(e.module[l].module_id),_=l+1,w.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${l+1}`),d.setAttribute("data-id",`${e.module[l].module_id}`);for(let n=1;n<=6;n++){let a=document.createElement("td");if(a.setAttribute("class",`td${n}`),n==1)a.innerHTML=fe++;else if(n==2)a.innerHTML=e.module[l].module_name;else if(n==3){let r;r=e.module[l].server_ids;let s=document.createElement("span"),i=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");s.innerHTML=i,a.appendChild(s)}else if(n==4){let r=e.module[l].module_type.toUpperCase(),s=JSON.stringify(r).replace(/[\[\]"\s\\]+/g,"");a.innerHTML=s}else if(n==5){a.setAttribute("class","td5 tdEditModule");let r=`<svg
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
        </svg>`;a.insertAdjacentHTML("afterbegin",r)}else if(n==6){a.setAttribute("class","td6 tdRemoveModule");let r=`<svg 
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
           </svg>`;a.insertAdjacentHTML("afterbegin",r)}d.appendChild(a)}document.getElementById("tBody3").appendChild(d)}}}),Ve(),Ge(),Y=!1,document.getElementById("idLoading").style.display="none",$e(),qe())}document.getElementById("buttonIframe1").addEventListener("click",function(){je("iframe_a","url_input_a"),Ze()});document.getElementById("buttonIframe2").addEventListener("click",function(){je("iframe_b","url_input_b"),Ze()});function Ve(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){P=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",Ct(d),Ut()})})}function je(e,t){const l=document.getElementById(t),d=document.getElementsByName(e)[0];l&&d&&(d.src=l.value)}function Ut(){let e;for(let n=0;n<w.length;n++)w[n].moduleID==ie&&(e=w[n].moduleType);const t=e.map(n=>n.toLowerCase()),l=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,l.checked=!0)}let ie,N=[];function Ct(e){let t=w[e-1].serverIDs,l=t.length;ie=w[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let d=b.length;for(let n=1;n<=d;n++){let a=I[n-1].id,r=document.createElement("div");r.setAttribute("class","form-check");let s=document.createElement("input");s.setAttribute("class","form-check-input editModalCheckbox"),s.setAttribute("data-server-id",`${a}`),s.setAttribute("value",""),s.setAttribute("type","checkbox"),s.setAttribute("id",`selectServer${a}`);let i=document.createElement("label");i.setAttribute("class","form-check-label"),i.setAttribute("for",`selectServer${a}`),i.innerHTML=`${b[n-1].nameServer}`,r.appendChild(s),r.appendChild(i),document.getElementById("ServerEditModule").appendChild(r)}N=[];for(let n=0;n<l;n++)N.push(t[n]),document.getElementById(`selectServer${t[n]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",qt(ie)});async function qt(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,a=document.getElementById("moduleType5GC"),r=document.getElementById("moduleTypeEPC");a.checked?n="5gc":r.checked&&(n="Epc");let s=document.querySelector('input[name="name_InputUserNameModule"]').value,i=document.querySelector('input[name="name_InputPasswordModule"]').value,m=[];document.querySelectorAll(".editModalCheckbox").forEach(h=>{h.checked&&m.push(Number(h.getAttribute("data-server-id")))});let v=new FormData;v.append("module_id",e),v.append("name",t),d&&v.append("config_file",d),v.append("type",n),m.forEach(h=>{v.append("server_ids[]",h)}),v.append("username",s),v.append("password",i);let c=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:v,headers:{"Content-Type":"multipart/form-data"},callback:function(h){let S=h.module.module_server.length,u=h.module.module_server;for(let o=0;o<w.length;o++)if(w[o].moduleID==e){w[o].serverIDs.length=0;for(let g=0;g<u.length;g++)w[o].serverIDs.push(u[g])}for(let o=0;o<w.length;o++)w[o].moduleType.length=0,w[o].moduleID==e&&w[o].moduleType.push(h.module.module_type);N=[];for(let o=0;o<S;o++)N.push(h.module.module_server[o]),document.getElementById(`selectServer${u[o]}`).checked=!0;if(N.length===0)document.querySelector(`#tr${P} .td3`).innerHTML="";else{c.checked&&(localStorage.setItem("userNameServer",s),localStorage.setItem("passwordServer",i)),document.querySelector(`#tr${P} .td2`).innerHTML=h.module.module_name;let o=h.module.module_server,g=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${P} .td3`).innerHTML=g,document.querySelector(`#tr${P} .td4`).innerHTML=h.module.module_type.toUpperCase()}p({text:h.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let We,Oe;function Ge(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,Oe=`#tr${e.id}`,We=w[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){$t()});async function $t(){await y({url:"delete-module",method:"delete",data:{module_id:We},callback:function(e){k=k.filter(l=>l!=e.module.id),document.querySelector(`${Oe}`).remove();for(let l=1;l<=k.length;l++){let d=k[l-1];document.querySelector(`[data-id="${d}"] .td1`).innerHTML=l}p({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(I),console.log(b),document.getElementById("ServerAddModule").innerHTML="",_t();for(let l=0;l<b.length;l++)if(b[l].serverStatus==1){for(let d=0;d<b.length;d++)if(I[l].name==b[d].nameServer){console.log(I[l].id);let n=I[l].id;console.log(n),console.log(document.getElementById(`selectServer${n}`)),document.getElementById(`selectServer${n}`).disabled=!0}}});function _t(){let e=b.length;for(let t=1;t<=e;t++){let l=I[t-1].id,d=document.createElement("div");d.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input addModalCheckbox"),n.setAttribute("data-server-id",`${l}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${l}`);let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectServer${l}`),a.innerHTML=`${b[t-1].nameServer}`,d.appendChild(n),d.appendChild(a),document.getElementById("ServerAddModule").appendChild(d)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let d=document.getElementById("moduleAddName").value,n=document.getElementById("moduleAddFile").value,a=document.querySelectorAll('input[name="flexRadioDefault"]'),r=document.querySelectorAll(".addModalCheckbox"),s=document.getElementById("userNameAddModule").value,i=document.getElementById("passwordAddModule").value;const m=[...a].some(c=>c.checked),v=[...r].some(c=>c.checked);d.length<3?p({text:"The module name is less than 3 characters."}).showToast():n==""?p({text:"No file has been selected."}).showToast():m==!1?p({text:"Select the desired module type."}).showToast():v==!1?p({text:"Select the desired server for the module."}).showToast():s.length<3?p({text:"The username is less than 3 characters."}).showToast():i.length<1&&p({text:"The password does not match the repeat field."}).showToast(),Ht()});async function Ht(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),a=document.getElementById("moduleAddTypeEPC");n.checked&&a.checked?d="Epc, 5gc":n.checked?d="5gc":a.checked&&(d="Epc");let r=document.querySelector('input[name="name_InputUserNameAddModule"]').value,s=document.querySelector('input[name="name_InputPasswordAddModule"]').value,i=[];document.querySelectorAll(".addModalCheckbox").forEach(c=>{c.checked&&i.push(Number(c.getAttribute("data-server-id")))});let m=new FormData;m.append("name",e),l&&m.append("config_file",l),m.append("type",d);let v=0;i.forEach(c=>{m.append(`server_id[${v}]`,c),v++}),m.append("username",r),m.append("password",s),await y({url:"create-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(c){let h=[];console.log(c),k.push(c.data.created_modules[0].module.module_id);for(let u=0;u<c.data.created_modules.length;u++)h.push(c.data.created_modules[u].server.server_id);let S=document.createElement("tr");S.setAttribute("id",`tr${++_}`),S.setAttribute("data-id",`${c.data.created_modules[0].module.module_id}`),w.push({serverIDs:h,moduleID:c.data.created_modules[0].module.module_id,moduleType:[c.data.created_modules[0].module.module_type]});for(let u=1;u<=6;u++){let o=document.createElement("td");if(o.setAttribute("class",`td${u}`),u==1)o.innerHTML=k.length;else if(u==2)o.innerHTML=document.getElementById("moduleAddName").value;else if(u==3){let g=[];for(let f=0;f<c.data.created_modules.length;f++)g.push(c.data.created_modules[f].server.server_id);o.innerHTML=g.join(", ")}else if(u==4){let g=[];for(let f=0;f<1;f++)g.push(c.data.created_modules[f].module.module_type.toUpperCase());o.innerHTML=g.join(", ")}else if(u==5){o.setAttribute("class","td5 tdEditModule");let g=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${_}"
          data-id-modules = "${_}"
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
        </svg>`;o.insertAdjacentHTML("afterbegin",g)}else if(u==6){o.setAttribute("class","td5 tdRemoveModule");let g=`<svg 
          xmlns="http://www.w3.org/2000/svg"
         width="26" 
         height="26" 
         id="${_}"
         data-id-modules = "${_}"
         data-bs-toggle="modal"
         data-bs-target="#removeModule"
         fill="currentColor" 
         class="bi bi-trash3 deleteModuleClick cursorPointer"
         viewBox="0 0 16 16">
         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
         </svg>`;o.insertAdjacentHTML("afterbegin",g)}S.appendChild(o)}document.getElementById("tBody3").appendChild(S),Ve(),Ge(),p({text:c.msg}).showToast()}}),document.getElementById("idLoading").style.display="none",$e(),qe()}async function Je(){await y({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function Ze(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await y({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function Ke(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const ce=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function le(){return window.location.hash||Ce||Ue(E[0])}const Pt=()=>{let e=le();document.querySelector(e)&&(Qe(e),ce(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ce(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){ce(le()),Qe(le())})});let ye=!0;function Qe(e){let l=new URL(window.location).searchParams.get("log");if(U=Number(l),document.querySelectorAll(".tab-pane").forEach(d=>{d.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(d=>{d.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),ye){switch(e){case"#v-servers-home":B(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":z(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":z(2),Me(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",Je(),B(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":B(4),oe(U),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":B(5),Fe(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}ye=!1}}
