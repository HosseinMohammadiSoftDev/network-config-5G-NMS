import{T as f,u as y}from"./useApi-Mgb1BH1A.js";import{s as rt}from"./auth-CIdfLHBs.js";function R(e){for(let t=1;t<=e;t++)document.querySelector(".subMenu"+t).classList.remove("clickSubMenu")}let M=[1,2,3,4,5];function Me(){for(let e=1;e<=M.length;e++)document.querySelector(".menus"+M[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;x(e),dt(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e),Ke()});function x(e){nt(),Me(),R(),ke(),document.querySelector(".menus"+e).classList.add("activeMenu")}function ke(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;j(e)});function j(e){nt(),Me(),R(),ke(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let Y=!1,it=document.getElementById("showPasswordAddUser");it.addEventListener("click",function(){ct()});function ct(){Y?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",Y=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",Y=!0)}let ee=!1,ut=document.getElementById("showPasswordEditUser");ut.addEventListener("click",function(){mt()});function mt(){ee?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",ee=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",ee=!0)}let te=!1,ht=document.getElementById("showPasswordShowConfig");ht.addEventListener("click",function(){gt()});function gt(){te?(document.getElementById("passwordShowConfig").type="password",te=!1):(document.getElementById("passwordShowConfig").type="text",te=!0)}let de=!1,vt=document.getElementById("showPasswordDeletServer");vt.addEventListener("click",function(){pt()});function pt(){de?(document.getElementById("passwordDeletServer").type="password",de=!1):(document.getElementById("passwordDeletServer").type="text",de=!0)}async function xe(){await y({url:"show-all-permission",callback:function(e){document.getElementById("showAccessLevel").innerHTML="",document.getElementById("divAccessLevelEdit").innerHTML="";for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevel${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevel${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckboxEdit"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevelEdit${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevelEdit${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("divAccessLevelEdit").appendChild(l)}}}),Te()}xe();let z,F,q=[],w;async function Te(){document.getElementById("idLoadingPermission").style.display="flex",document.getElementById("showAccessLevel").style.display="none",document.getElementById("divPasswordAddUser").classList.add("margin_top"),await y({url:"show-all-roles",callback:function(n){n.data[0],z=n.data[1],F=n.data[2],w=document.querySelectorAll('input[type="checkbox"][data-id]'),q=[],w.forEach(a=>{q.push(a.getAttribute("data-id"))}),w.forEach(a=>{F.permissions.some(s=>s===a.getAttribute("data-id"))&&(a.checked=!0),a.disabled=!1})}}),document.getElementById("idLoadingPermission").style.display="none",document.getElementById("showAccessLevel").style.display="block",document.getElementById("divPasswordAddUser").classList.remove("margin_top");let e,t=13,l=[];document.querySelectorAll(".accessLevelCheckbox").forEach(n=>{l.push(n.id)}),w.forEach(n=>{n.addEventListener("change",()=>{let a=document.getElementById("selectAccessLevel1"),r=document.getElementById("selectAccessLevel2"),s=document.getElementById("selectAccessLevel3"),i=document.getElementById("selectAccessLevel4"),c=document.getElementById("selectAccessLevel9"),h=document.getElementById("selectAccessLevel5"),m=document.getElementById("selectAccessLevel6"),v=document.getElementById("selectAccessLevel7"),E=document.getElementById("selectAccessLevel8");if((r.checked||s.checked||i.checked||c.checked)&&(a.checked=!0),a.checked?h.checked=!0:h.checked=!1,(m.checked||v.checked||E.checked)&&(h.checked=!0),a.checked){let u=!1;for(let o=13;o<=l.length;o++)if(document.getElementById("selectAccessLevel"+o).checked){e=o,u=!0;break}u||(document.getElementById("selectAccessLevel"+e).checked=!0,f({text:"At least one server option must be selected."}).showToast())}else for(let u=13;u<=l.length;u++)document.getElementById("selectAccessLevel"+u).checked=!1})});let d=[];document.querySelectorAll(".accessLevelCheckboxEdit").forEach(n=>{d.push(n.id)}),w.forEach(n=>{n.addEventListener("change",()=>{let a=document.getElementById("selectAccessLevelEdit1"),r=document.getElementById("selectAccessLevelEdit2"),s=document.getElementById("selectAccessLevelEdit3"),i=document.getElementById("selectAccessLevelEdit4"),c=document.getElementById("selectAccessLevelEdit9"),h=document.getElementById("selectAccessLevelEdit5"),m=document.getElementById("selectAccessLevelEdit6"),v=document.getElementById("selectAccessLevelEdit7"),E=document.getElementById("selectAccessLevelEdit8");if((r.checked||s.checked||i.checked||c.checked)&&(a.checked=!0,h.checked=!0),a.checked?h.checked=!0:h.checked=!1,(m.checked||v.checked||E.checked)&&(h.checked=!0),a.checked){let u=!1;for(let o=13;o<=l.length;o++)if(document.getElementById("selectAccessLevelEdit"+o).checked){t=o,u=!0;break}u||(document.getElementById("selectAccessLevelEdit"+t).checked=!0,f({text:"At least one server option must be selected."}).showToast())}else for(let u=13;u<=l.length;u++)document.getElementById("selectAccessLevelEdit"+u).checked=!1})})}function ft(){w.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(z.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),w.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&F.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function yt(){w.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(z.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),w.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&F.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function Et(e){w.forEach(t=>{t.disabled=!0}),e==="visitor"?z.permissions.forEach(t=>{q.includes(t)&&w.forEach(l=>{l.getAttribute("data-id")===t&&(l.disabled=!1)})}):w.forEach(t=>{t.disabled=!1})}document.getElementById("selectAddUser").addEventListener("change",ft);document.getElementById("selectEditUser").addEventListener("change",yt);let bt=document.getElementById("addUserModal");bt.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",C=[],W=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),ue(),Te()});let C=[];function It(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){console.log(e),console.log(C);let t=document.querySelector(`label[for='${e.id}']`);C.push(t.innerHTML)}})}function wt(){document.querySelectorAll(".accessLevelCheckboxEdit").forEach(function(e){if(e.checked){console.log(e),console.log(C);let t=document.querySelector(`label[for='${e.id}']`);C.push(t.innerHTML)}})}let Lt=document.getElementById("addTableUsers");Lt.addEventListener("click",function(){console.log(z);let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?f({text:"The name is less than 3 characters."}).showToast():t.length<3?f({text:"The last name is less than 3 characters."}).showToast():l.length<3?f({text:"The username is less than 3 characters."}).showToast():d.length<8?f({text:"The password is less than 8 characters."}).showToast():d!=n&&f({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&d.length>=8&&n.length>=8&&d===n&&(Bt(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let St=document.getElementById("canselAddTableUser");St.addEventListener("click",function(){ue()});function ue(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const At=document.querySelectorAll(".accessLevelAdd");At.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let W=0;async function Bt(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,a=document.getElementById("repeatPasswordAddUser").value,r=new FormData;r.append("first_name",e),r.append("last_name",t),r.append("auth_name",l),r.append("role",d),r.append("password",n),r.append("password_confirmation",a),console.log("AddUser"),It(),C.forEach(s=>{r.append(`permission_name[${W++}]`,s)}),await y({method:"post",url:"add-member",data:r,headers:{"Content-Type":"multipart/form-data"},callback:function(s){T.push(s.data.user);let i=document.createElement("tr");i.setAttribute("id",`tr${s.data.user.id}`),i.setAttribute("data-id",`${s.data.user.id}`),A.push({id:s.data.user.id,name:s.data.user.first_name,family:s.data.user.last_name,authName:s.data.user.auth_name,permission:s.data.permission_name,role:s.data.role});for(let c=1;c<=8;c++){let h=document.createElement("td");if(h.setAttribute("class",`td${c}`),c==1)console.log(T.length),h.innerHTML=T.length;else if(c==2)h.innerHTML=document.getElementById("nameInputAddUser").value;else if(c==3)h.innerHTML=document.getElementById("familyInputAddUser").value;else if(c==4)h.innerHTML=document.getElementById("authNameInputAddUser").value;else if(c==5){let m=document.createElement("span");m.innerHTML=document.getElementById("selectAddUser").value,h.appendChild(m),s.data.role=="expert"?m.setAttribute("class","badge text-bg-primary fs-5"):s.data.role=="visitor"&&m.setAttribute("class","badge text-bg-success fs-5")}else if(c==6){let m=`
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
            `;h.insertAdjacentHTML("afterbegin",m)}else if(c==7){let m=`<svg
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
        </svg>`;h.insertAdjacentHTML("afterbegin",m)}else if(c==8){let m=`<svg
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
        </svg>`;h.insertAdjacentHTML("afterbegin",m)}i.appendChild(h)}document.getElementById("tBody").appendChild(i),ue(),$e(),qe(),f({text:s.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Mt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Mt;let kt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=kt;window.onload=function(){qt()};let fe=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){xe(),Ue();const e=this.dataset.id;j(e),document.getElementById("idLoading").style.display="flex"});let A=[],Ce,le=!1,ye=1,T=[];async function Ue(){if(le)return;le=!0,await y({url:"show-all-users?paginate=30",callback:function(t){ye=1,A=[],fe&&(document.getElementById("tBody").innerHTML=""),fe=!0;let l=t.data.user.length;for(let d=0;d<l;d++){T.push(t.data.user[d]);let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),n.setAttribute("data-id",`${t.data.user[d].id}`),A.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,permission:t.data.user[d].permissions,role:t.data.user[d].roles[0]});for(let a=1;a<=8;a++){let r=document.createElement("td");if(r.setAttribute("class",`td${a}`),a==1)r.innerHTML=ye++;else if(a==2)r.innerHTML=t.data.user[d].first_name;else if(a==3)r.innerHTML=t.data.user[d].last_name;else if(a==4)r.innerHTML=t.data.user[d].auth_name;else if(a==5){let s=document.createElement("span");s.innerHTML=t.data.user[d].roles[0],r.appendChild(s),t.data.user[d].roles[0]=="admin"?s.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?s.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&s.setAttribute("class","badge text-bg-success fs-5")}else if(a==6){let s=`
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}else if(a==8)if(d!=0){let s=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",s)}else{let s=document.createElement("p");s.innerHTML="____",r.appendChild(s)}n.appendChild(r)}document.getElementById("tBody").appendChild(n)}e(t)}}),le=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,d=t.data.user;for(let n=0;n<l;n++)d[n].id}$e(),qe()}function qe(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,Ce=t.id})})}let xt=document.getElementById("removeUserModalClick");xt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ct(Ce)});let me;function $e(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){C=[],document.getElementById("divShowPermission").innerHTML="";const l=A.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++){let n=l.permission[d],a=document.createElement("p");a.innerHTML=n,document.getElementById("divShowPermission").appendChild(a)}})}),e.forEach(t=>{t.addEventListener("click",function(){t.id==1?(document.getElementById("roleEditUser").style.display="none",document.getElementById("divEditUsers").style.display="none"):(document.getElementById("roleEditUser").style.display="block",document.getElementById("divEditUsers").style.display="block"),document.getElementById("divShowPermission").innerHTML="";let l=[];l=A.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++)document.querySelectorAll("#divEditUsers input").forEach(a=>{a.checked=!1});for(let n=0;n<l.permission.length;n++){let a=l.permission[n];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(r=>{let s=document.querySelector(`label[for='${r.id}']`);if(a===s.innerHTML){let i=document.createElement("p");i.innerHTML=a,document.getElementById("divShowPermission").appendChild(i),r.checked=!0}}),document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckboxEdit").forEach(r=>{let s=document.querySelector(`label[for='${r.id}']`);if(a===s.innerHTML){let i=document.createElement("p");i.innerHTML=a,document.getElementById("divShowPermission").appendChild(i),r.checked=!0}})}me=t;let d=A.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role,Et(d.role))})})}let Tt=document.getElementById("addEditUser");Tt.addEventListener("click",function(){W=0,document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ut(me.id)});async function Ct(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),T=T.filter(n=>n.id!=t.data.id);for(let n=1;n<=T.length;n++){let a=T[n-1].id;document.querySelector(`[data-id="${a}"] .td1`).innerHTML=n}f({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ut(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,a=document.getElementById("selectEditUser").value,r=document.getElementById("passwordEditUser").value,s=document.getElementById("repeatPasswordEditUser").value,i=new FormData;i.append("user_id",t),i.append("first_name",l),i.append("last_name",d),i.append("auth_name",n),i.append("role",a),i.append("password",r),i.append("password_confirmation",s),wt(),C.forEach(c=>{i.append(`permission_name[${W++}]`,c)}),await y({method:"post",url:"edit_member",data:i,headers:{"Content-Type":"multipart/form-data"},callback:function(c){A.forEach(v=>{v.id==c.data.user.id&&(v.name=c.data.user.name,v.family=c.data.user.family,v.authName=c.data.user.authName,v.role=c.data.user.role,v.permission=c.data.user.permissions)});let h=A.findIndex(v=>v.id==me.id);h!=-1&&(A[h].id=c.data.user.id,A[h].name=c.data.user.first_name,A[h].family=c.data.user.last_name,A[h].authName=c.data.user.auth_name,A[h].role=c.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=c.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=c.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=c.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=c.data.user.roles;let m=document.querySelector(`#tr${c.data.user.id} .td5 span`);m.innerHTML=="expert"?(m.classList.remove("text-bg-success"),m.classList.add("text-bg-primary")):m.innerHTML=="visitor"&&(m.classList.remove("text-bg-primary"),m.classList.add("text-bg-success")),f({text:c.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let B,_e,b=[],L,He=!1,Pe=!1;function Ne(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let De="",Ee,se,oe=[];async function qt(){await y({url:"get-me",callback:function(l){se=l.data.user.permissionServerIds,Ee=l.data.user.roles[0],L=l.data.user.permissions,rt(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(l){B=l.data;for(let d=0;d<l.data.length;d++)oe.push(l.data[d].id),b.push({numberOfServers:l.data.length,nameServer:l.data[d].name,serverStatus:l.data[d].is_down});Pt(B)}}),document.getElementById("idLoading").style.display="none",Gt();const e=document.querySelectorAll(".Server");Re(e);const t=document.querySelectorAll(".editServer");je(t),De=Ne(L[0]),L.includes("user")?R(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),R(1)),L.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),M=M.filter(l=>l!=1)),L.includes("VM/create")||document.getElementById("iconAddServer").remove(),L.includes("VM/update")||document.querySelectorAll(".editServer").forEach(l=>{l.remove()}),L.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.remove()}),L.includes("module/read")||(document.getElementById("v-module-tab").remove(),M=M.filter(l=>l!=5)),L.includes("module/create")||document.getElementById("addModal").remove(),L.includes("module/update")||(He=!0,document.getElementById("thEditModule").remove()),L.includes("module/delete")||(Pe=!0,document.getElementById("thRemoveModule").remove()),L.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(l=>{l.remove()}),document.querySelectorAll(".divIconPlay").forEach(l=>{l.remove()})),L.includes("log")||(document.getElementById("v-log-tab").remove(),M=M.filter(l=>l!=4)),L.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),M=M.filter(l=>l!=3)),Ee!="admin"&&oe.filter(d=>!se.includes(d)).forEach(d=>{document.querySelector(`.info-box[data-server-id='${d}']`).remove()})}function Ve(){He&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function ze(){Pe&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function Re(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",$t(l)})}let k;function je(e){e.forEach(t=>{t.addEventListener("click",function(){let l=B.find(a=>a.id==this.dataset.id);_e=this.dataset.id;let d=l.name,n=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function $t(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(){localStorage.setItem("userNameServer",t),localStorage.setItem("passwordServer",l),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function _t(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(d){let n=0,a=d.data.name,r=d.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=r,B.find(i=>(n++,i.id==e))&&(B[n-1].name=a,B[n-1].ip=r),f({text:d.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ht=document.getElementById("subServer");Ht.addEventListener("click",function(){_t(_e)});let O,Z,Fe,re,ie,H,be;function Pt(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(d=>{H=document.createElement("div"),e[t].is_down==0?H.className="info-box host col-3 ms-5":H.className="info-box off col-3 ms-5",H.setAttribute("data-server-id",`${e[t].id}`),t++,H.innerHTML=`
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
  `,l.appendChild(H)}),Oe(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Nt(Z)}),Ze(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Dt(O)}),We(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?f({text:"The name is less than 3 characters."}).showToast():n.length<8&&f({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Vt(Fe),document.getElementById("idLoading").style.display="flex")}),Ge(),Je(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?f({text:"The name is less than 3 characters."}).showToast():n.length<7&&f({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(zt(),document.getElementById("idLoading").style.display="flex")})}function Oe(){be=document.querySelectorAll(".divIconPause"),be.forEach(e=>{e.addEventListener("click",function(){re=e.id,O=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Ze(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){ie=t.id,Z=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function We(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Fe=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function Nt(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=b.findIndex(n=>n.nameServer===t.data.name);l!==-1&&(b[l].serverStatus=0);let d=t.msg;document.getElementById(`${ie}`).classList.remove("d-flex"),document.getElementById(`${ie}`).classList.add("d-none"),document.getElementById(`iconPause${Z}`).classList.remove("d-none"),document.getElementById(`iconPause${Z}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),f({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Dt(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,d=b.findIndex(n=>n.nameServer===t.data.name);d!==-1&&(b[d].serverStatus=1),document.getElementById(`${re}`).classList.remove("d-flex"),document.getElementById(`${re}`).classList.add("d-none"),document.getElementById(`iconPlay${O}`).classList.remove("d-none"),document.getElementById(`iconPlay${O}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),f({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Vt(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(d){b=b.filter(r=>r.nameServer!==d.data.name);let a=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),f({text:a}).showToast()}}),document.getElementById("idLoading").style.display="none"}function Ge(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("data-id"),l=document.getElementById("nameServer"+t).innerHTML;localStorage.setItem("nameServer",l),document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Je(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="/etc/bbdh",document.getElementById("addPathRunConfigServer").value="/usr/bin"})}async function zt(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,d=document.querySelector('input[name="nameAddPathConfigServer"]').value,n=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:l,path_config:d,path_run_config:n},callback:function(s){oe.push(s.data.id),se.push(s.data.id),b.push({numberOfServers:b.length,nameServer:s.data.name}),B.push(s.data);const i=document.createElement("div");i.className="info-box host col-3 ms-5",i.setAttribute("data-server-id",`${s.data.id}`),i.innerHTML=`
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
  `,e.appendChild(i),Je(),Ge(),f({text:s.msg}).showToast()}}),Oe(),Ze(),We();const a=document.querySelectorAll(".Server");Re(a);const r=document.querySelectorAll(".editServer");je(r),document.getElementById("idLoading").style.display="none"}let Ie=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",k==0&&(k=1),he(k);const e=this.dataset.id;x(e)});let we,ne=!1;async function he(e=1){if(ne)return;ne=!0;let t=[],l;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var i,c,h,m,v,E;t.push(d.data.data),Ie&&(document.getElementById("tBody2").innerHTML=""),Ie=!0;let n=Math.ceil(d.data.total/20),a;e==1,a=(e-1)*20,a++;let r=d.data.data.length;for(let u=0;u<r;u++){let o=document.createElement("tr");for(let g=1;g<=5;g++){let p=document.createElement("td");if(g==1)p.innerHTML=a++;else if(g==2){let S=document.createElement("span"),N=document.createElement("span");S.setAttribute("class","mx-2"),N.setAttribute("class","mx-2");let $=document.createElement("div");$.setAttribute("class","mt-2"),S.innerHTML=((c=(i=d.data.data[u].properties)==null?void 0:i.user)==null?void 0:c.first_name)||"-",N.innerHTML=((m=(h=d.data.data[u].properties)==null?void 0:h.user)==null?void 0:m.last_name)||"-",$.innerHTML=((E=(v=d.data.data[u].properties)==null?void 0:v.user)==null?void 0:E.auth_name)||"-",p.appendChild(S),p.appendChild(N),p.appendChild($),$.classList.add("fontSize")}else if(g==3)p.innerHTML=d.data.data[u].event;else if(g==4){p.innerHTML=d.data.data[u].description;const S=document.createElement("div");S.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${u} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,p.appendChild(S)}else if(g==5){let S=new Date(d.data.data[u].created_at).toLocaleString();p.innerHTML=S}o.appendChild(p)}document.getElementById("tBody2").appendChild(o)}l=n,s(l,we);function s(u,o=k||1){const g=document.getElementById("pagination");if(g.innerHTML="",u!=1){const p=document.createElement("li");p.className=`page-item ${o===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',g.appendChild(p);const S=document.createElement("li");S.className=`page-item ${o===1?"disabled":""}`,S.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,g.appendChild(S);const N=o===1?o:o-1,$=o===u?o:Math.min(o+1,u);for(let _=Math.max(1,N-1);_<=Math.min(u,$+1);_++){const X=document.createElement("li");X.className=`page-item ${_===o?"active":""}`,X.innerHTML=`<a class="page-link ${_===o?"active-page":""}" href="#" data-page="${_}">${_}</a>`,g.appendChild(X)}const K=document.createElement("li");K.className=`page-item ${o===u?"disabled":""}`,K.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,g.appendChild(K);const Q=document.createElement("li");Q.className=`page-item ${o===u?"disabled":""}`,Q.innerHTML=`<a class="page-link" href="#" data-page="${u}">Last Page</a>`,g.appendChild(Q);const pe=new URL(window.location);pe.searchParams.set("log",o||1),window.history.pushState({},"",pe)}}}}),ne=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const a=parseInt(this.getAttribute("data-page"));!isNaN(a)&&a>0&&a<=l&&(document.getElementById("idLoading").style.display="flex",we=a,he(a),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){const n=this.dataset.idLog,r=t[0][n],s=document.getElementById("formLog");s.innerHTML="",r?i(r,s):s.innerHTML='<p class="highlight">No data found for the given ID.</p>';function i(h,m,v=0){const E=document.createElement("ul");E.style.marginLeft=`${v*5}px`;let u;for(const o in h)if(o!="id"&&o!="subject_type"&&o!="subject_id"&&o!="causer_type"&&o!="causer_id"&&o!="batch_uuid"&&h.hasOwnProperty(o)){const g=h[o],p=document.createElement("li");if(o==="changes"&&p.classList.add("changes-highlight"),typeof g=="object"&&g!==null)p.innerHTML=`<strong>${o}:</strong>`,E.appendChild(p),i(g,p,v+1);else if(typeof g=="string"&&c(g)){p.innerHTML=`<strong>${o}:</strong>`,E.appendChild(p);const S=JSON.parse(g);i(S,p,v+1)}else o=="updated_at"||o=="created_at"?u=new Date(g).toLocaleString():u=g,p.innerHTML=`<strong>${o}:</strong> <span class="highlight">${u}</span>`,E.appendChild(p)}m.appendChild(E)}function c(h){try{JSON.parse(h)}catch{return!1}return!0}})})}let I=[],ae=!1,D,P,Le=1,U=[];async function Ke(){document.getElementById("idLoading").style.display="flex",!ae&&(ae=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),Le=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){U.push(e.module[l].module_id),P=l+1,I.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${l+1}`),d.setAttribute("data-id",`${e.module[l].module_id}`);for(let n=1;n<=6;n++){let a=document.createElement("td");if(a.setAttribute("class",`td${n}`),n==1)a.innerHTML=Le++;else if(n==2)a.innerHTML=e.module[l].module_name;else if(n==3){let r;r=e.module[l].server_ids;let s=document.createElement("span"),i=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");s.innerHTML=i,a.appendChild(s)}else if(n==4){let r=e.module[l].module_type.toUpperCase(),s=JSON.stringify(r).replace(/[\[\]"\s\\]+/g,"");a.innerHTML=s}else if(n==5){a.setAttribute("class","td5 tdEditModule");let r=`<svg
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
           </svg>`;a.insertAdjacentHTML("afterbegin",r)}d.appendChild(a)}document.getElementById("tBody3").appendChild(d)}}}),Qe(),tt(),ae=!1,document.getElementById("idLoading").style.display="none",ze(),Ve())}document.getElementById("buttonIframe1").addEventListener("click",function(){Xe("iframe_a","url_input_a"),lt()});document.getElementById("buttonIframe2").addEventListener("click",function(){Xe("iframe_b","url_input_b"),lt()});function Qe(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){D=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",jt(d),Rt()})})}function Xe(e,t){const l=document.getElementById(t),d=document.getElementsByName(e)[0];l&&d&&(d.src=l.value)}function Rt(){let e;for(let n=0;n<I.length;n++)I[n].moduleID==ge&&(e=I[n].moduleType);const t=e.map(n=>n.toLowerCase()),l=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,l.checked=!0)}let ge,V=[];function jt(e){let t=I[e-1].serverIDs,l=t.length;ge=I[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let d=b.length;for(let n=1;n<=d;n++){let a=B[n-1].id,r=document.createElement("div");r.setAttribute("class","form-check");let s=document.createElement("input");s.setAttribute("class","form-check-input editModalCheckbox"),s.setAttribute("data-server-id",`${a}`),s.setAttribute("value",""),s.setAttribute("type","checkbox"),s.setAttribute("id",`selectServer${a}`);let i=document.createElement("label");i.setAttribute("class","form-check-label"),i.setAttribute("for",`selectServer${a}`),i.innerHTML=`${b[n-1].nameServer}`,r.appendChild(s),r.appendChild(i),document.getElementById("ServerEditModule").appendChild(r)}V=[];for(let n=0;n<l;n++)V.push(t[n]),document.getElementById(`selectServer${t[n]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ft(ge)});async function Ft(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,a=document.getElementById("moduleType5GC"),r=document.getElementById("moduleTypeEPC");a.checked?n="5gc":r.checked&&(n="Epc");let s=document.querySelector('input[name="name_InputUserNameModule"]').value,i=document.querySelector('input[name="name_InputPasswordModule"]').value,c=[];document.querySelectorAll(".editModalCheckbox").forEach(v=>{v.checked&&c.push(Number(v.getAttribute("data-server-id")))});let h=new FormData;h.append("module_id",e),h.append("name",t),d&&h.append("config_file",d),h.append("type",n),c.forEach(v=>{h.append("server_ids[]",v)}),h.append("username",s),h.append("password",i);let m=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:h,headers:{"Content-Type":"multipart/form-data"},callback:function(v){let E=v.module.module_server.length,u=v.module.module_server;for(let o=0;o<I.length;o++)if(I[o].moduleID==e){I[o].serverIDs.length=0;for(let g=0;g<u.length;g++)I[o].serverIDs.push(u[g])}for(let o=0;o<I.length;o++)I[o].moduleType.length=0,I[o].moduleID==e&&I[o].moduleType.push(v.module.module_type);V=[];for(let o=0;o<E;o++)V.push(v.module.module_server[o]),document.getElementById(`selectServer${u[o]}`).checked=!0;if(V.length===0)document.querySelector(`#tr${D} .td3`).innerHTML="";else{m.checked&&(localStorage.setItem("userNameServer",s),localStorage.setItem("passwordServer",i)),document.querySelector(`#tr${D} .td2`).innerHTML=v.module.module_name;let o=v.module.module_server,g=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${D} .td3`).innerHTML=g,document.querySelector(`#tr${D} .td4`).innerHTML=v.module.module_type.toUpperCase()}f({text:v.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ye,et;function tt(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,et=`#tr${e.id}`,Ye=I[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){Ot()});async function Ot(){await y({url:"delete-module",method:"delete",data:{module_id:Ye},callback:function(e){U=U.filter(l=>l!=e.module.id),document.querySelector(`${et}`).remove();for(let l=1;l<=U.length;l++){let d=U[l-1];document.querySelector(`[data-id="${d}"] .td1`).innerHTML=l}f({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(B),console.log(b),document.getElementById("ServerAddModule").innerHTML="",Zt();for(let l=0;l<b.length;l++)if(b[l].serverStatus==1){for(let d=0;d<b.length;d++)if(B[l].name==b[d].nameServer){console.log(B[l].id);let n=B[l].id;console.log(n),console.log(document.getElementById(`selectServer${n}`)),document.getElementById(`selectServer${n}`).disabled=!0}}});function Zt(){let e=b.length;for(let t=1;t<=e;t++){let l=B[t-1].id,d=document.createElement("div");d.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input addModalCheckbox"),n.setAttribute("data-server-id",`${l}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${l}`);let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectServer${l}`),a.innerHTML=`${b[t-1].nameServer}`,d.appendChild(n),d.appendChild(a),document.getElementById("ServerAddModule").appendChild(d)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let d=document.getElementById("moduleAddName").value,n=document.getElementById("moduleAddFile").value,a=document.querySelectorAll('input[name="flexRadioDefault"]'),r=document.querySelectorAll(".addModalCheckbox"),s=document.getElementById("userNameAddModule").value,i=document.getElementById("passwordAddModule").value;const c=[...a].some(m=>m.checked),h=[...r].some(m=>m.checked);d.length<3?f({text:"The module name is less than 3 characters."}).showToast():n==""?f({text:"No file has been selected."}).showToast():c==!1?f({text:"Select the desired module type."}).showToast():h==!1?f({text:"Select the desired server for the module."}).showToast():s.length<3?f({text:"The username is less than 3 characters."}).showToast():i.length<1&&f({text:"The password does not match the repeat field."}).showToast(),Wt()});async function Wt(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),a=document.getElementById("moduleAddTypeEPC");n.checked&&a.checked?d="Epc, 5gc":n.checked?d="5gc":a.checked&&(d="Epc");let r=document.querySelector('input[name="name_InputUserNameAddModule"]').value,s=document.querySelector('input[name="name_InputPasswordAddModule"]').value,i=[];document.querySelectorAll(".addModalCheckbox").forEach(m=>{m.checked&&i.push(Number(m.getAttribute("data-server-id")))});let c=new FormData;c.append("name",e),l&&c.append("config_file",l),c.append("type",d);let h=0;i.forEach(m=>{c.append(`server_id[${h}]`,m),h++}),c.append("username",r),c.append("password",s),await y({url:"create-module",method:"post",data:c,headers:{"Content-Type":"multipart/form-data"},callback:function(m){let v=[];console.log(m),U.push(m.data.created_modules[0].module.module_id);for(let u=0;u<m.data.created_modules.length;u++)v.push(m.data.created_modules[u].server.server_id);let E=document.createElement("tr");E.setAttribute("id",`tr${++P}`),E.setAttribute("data-id",`${m.data.created_modules[0].module.module_id}`),I.push({serverIDs:v,moduleID:m.data.created_modules[0].module.module_id,moduleType:[m.data.created_modules[0].module.module_type]});for(let u=1;u<=6;u++){let o=document.createElement("td");if(o.setAttribute("class",`td${u}`),u==1)o.innerHTML=U.length;else if(u==2)o.innerHTML=document.getElementById("moduleAddName").value;else if(u==3){let g=[];for(let p=0;p<m.data.created_modules.length;p++)g.push(m.data.created_modules[p].server.server_id);o.innerHTML=g.join(", ")}else if(u==4){let g=[];for(let p=0;p<1;p++)g.push(m.data.created_modules[p].module.module_type.toUpperCase());o.innerHTML=g.join(", ")}else if(u==5){o.setAttribute("class","td5 tdEditModule");let g=`<svg
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
        </svg>`;o.insertAdjacentHTML("afterbegin",g)}else if(u==6){o.setAttribute("class","td5 tdRemoveModule");let g=`<svg 
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
         </svg>`;o.insertAdjacentHTML("afterbegin",g)}E.appendChild(o)}document.getElementById("tBody3").appendChild(E),Qe(),tt(),f({text:m.msg}).showToast()}}),document.getElementById("idLoading").style.display="none",ze(),Ve()}async function dt(){await y({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function lt(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await y({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function nt(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const Se=document.getElementById("IframeZobbix"),G=Se.contentDocument||Se.contentWindow.document;G.open();G.write(`
    <html>
        <body>
         <img class="imgMonitoring" src="../assets/img/Monitor-cuate.svg" alt="عکس نمونه">
        </body>
    </html>
`);G.close();const at=G.querySelector(".imgMonitoring");at.style.width="100%";at.style.height="550px";const Ae=document.getElementById("IframeELK"),J=Ae.contentDocument||Ae.contentWindow.document;J.open();J.write(`
    <html>
        <body>
         <img class="imgMonitoringELK" src="../assets/img/Monitor-cuate.svg" alt="عکس نمونه">
        </body>
    </html>
`);J.close();const st=J.querySelector(".imgMonitoringELK");st.style.width="100%";st.style.height="550px";const ve=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function ce(){return window.location.hash||De||Ne(L[0])}const Gt=()=>{let e=ce();document.querySelector(e)&&(ot(e),ve(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ve(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){ve(ce()),ot(ce())})});let Be=!0;function ot(e){let l=new URL(window.location).searchParams.get("log");if(k=Number(l),document.querySelectorAll(".tab-pane").forEach(d=>{d.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(d=>{d.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),Be){switch(e){case"#v-servers-home":x(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":j(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":j(2),Ue(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",dt(),x(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":x(4),k==0&&(k=1),he(k),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":x(5),Ke(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}Be=!1}}
