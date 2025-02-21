import{T as y,u as E}from"./useApi-Mgb1BH1A.js";import{s as rt}from"./auth-CIdfLHBs.js";function z(e){for(let t=1;t<=e;t++)document.querySelector(".subMenu"+t).classList.remove("clickSubMenu")}let M=[1,2,3,4,5];function Me(){for(let e=1;e<=M.length;e++)document.querySelector(".menus"+M[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;x(e),dt(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;x(e),Ke()});function x(e){nt(),Me(),z(),ke(),document.querySelector(".menus"+e).classList.add("activeMenu")}function ke(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;R(e)});function R(e){nt(),Me(),z(),ke(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let Y=!1,it=document.getElementById("showPasswordAddUser");it.addEventListener("click",function(){ct()});function ct(){Y?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",Y=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",Y=!0)}let ee=!1,ut=document.getElementById("showPasswordEditUser");ut.addEventListener("click",function(){mt()});function mt(){ee?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",ee=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",ee=!0)}let te=!1,ht=document.getElementById("showPasswordShowConfig");ht.addEventListener("click",function(){gt()});function gt(){te?(document.getElementById("passwordShowConfig").type="password",te=!1):(document.getElementById("passwordShowConfig").type="text",te=!0)}let de=!1,vt=document.getElementById("showPasswordDeletServer");vt.addEventListener("click",function(){pt()});function pt(){de?(document.getElementById("passwordDeletServer").type="password",de=!1):(document.getElementById("passwordDeletServer").type="text",de=!0)}async function xe(){await E({url:"show-all-permission",callback:function(e){document.getElementById("showAccessLevel").innerHTML="",document.getElementById("divAccessLevelEdit").innerHTML="";for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevel${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevel${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckboxEdit"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevelEdit${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevelEdit${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("divAccessLevelEdit").appendChild(l)}}})}xe();let Z,j,q=[],w;async function Te(){document.getElementById("idLoadingPermission").style.display="flex",document.getElementById("showAccessLevel").style.display="none",document.getElementById("divPasswordAddUser").classList.add("margin_top"),await E({url:"show-all-roles",callback:function(d){d.data[0],Z=d.data[1],j=d.data[2],w=document.querySelectorAll('input[type="checkbox"][data-id]'),q=[],w.forEach(n=>{q.push(n.getAttribute("data-id"))}),w.forEach(n=>{j.permissions.some(o=>o===n.getAttribute("data-id"))&&(n.checked=!0),n.disabled=!1})}}),document.getElementById("idLoadingPermission").style.display="none",document.getElementById("showAccessLevel").style.display="block",document.getElementById("divPasswordAddUser").classList.remove("margin_top");let e,t=[];document.querySelectorAll(".accessLevelCheckbox").forEach(d=>{t.push(d.id)}),w.forEach(d=>{d.addEventListener("change",()=>{let n=document.getElementById("selectAccessLevel1"),s=document.getElementById("selectAccessLevel2"),o=document.getElementById("selectAccessLevel3"),a=document.getElementById("selectAccessLevel4"),c=document.getElementById("selectAccessLevel9"),i=document.getElementById("selectAccessLevel5"),m=document.getElementById("selectAccessLevel6"),u=document.getElementById("selectAccessLevel7"),v=document.getElementById("selectAccessLevel8");if((s.checked||o.checked||a.checked||c.checked)&&(n.checked=!0),n.checked?i.checked=!0:i.checked=!1,(m.checked||u.checked||v.checked)&&(i.checked=!0),n.checked){let f=!1;for(let h=13;h<=t.length;h++)if(document.getElementById("selectAccessLevel"+h).checked){e=h,f=!0;break}f||(document.getElementById("selectAccessLevel"+e).checked=!0,y({text:"At least one server option must be selected."}).showToast())}else for(let f=13;f<=t.length;f++)document.getElementById("selectAccessLevel"+f).checked=!1})});let l=[];document.querySelectorAll(".accessLevelCheckboxEdit").forEach(d=>{l.push(d.id)}),w.forEach(d=>{d.addEventListener("change",()=>{let n=document.getElementById("selectAccessLevelEdit1"),s=document.getElementById("selectAccessLevelEdit2"),o=document.getElementById("selectAccessLevelEdit3"),a=document.getElementById("selectAccessLevelEdit4"),c=document.getElementById("selectAccessLevelEdit9"),i=document.getElementById("selectAccessLevelEdit5"),m=document.getElementById("selectAccessLevelEdit6"),u=document.getElementById("selectAccessLevelEdit7"),v=document.getElementById("selectAccessLevelEdit8");if((s.checked||o.checked||a.checked||c.checked)&&(n.checked=!0,i.checked=!0),n.checked?i.checked=!0:i.checked=!1,(m.checked||u.checked||v.checked)&&(i.checked=!0),!n.checked)for(let f=13;f<=t.length;f++)document.getElementById("selectAccessLevelEdit"+f).checked=!1;if(!n.checked)for(let f=13;f<=t.length;f++)document.getElementById("selectAccessLevelEdit"+f).checked=!1})})}function ft(){w.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(Z.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),w.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&j.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function yt(){w.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(Z.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),w.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&j.permissions.forEach(e=>{q.includes(e)&&w.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function Et(e){w.forEach(t=>{t.disabled=!0}),e==="visitor"?Z.permissions.forEach(t=>{q.includes(t)&&w.forEach(l=>{l.getAttribute("data-id")===t&&(l.disabled=!1)})}):w.forEach(t=>{t.disabled=!1})}document.getElementById("selectAddUser").addEventListener("change",ft);document.getElementById("selectEditUser").addEventListener("change",yt);Te();let bt=document.getElementById("addUserModal");bt.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",U=[],W=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),ue(),Te()});let U=[];function It(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}function wt(){document.querySelectorAll(".accessLevelCheckboxEdit").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}let St=document.getElementById("addTableUsers");St.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("passwordAddUser").value,n=document.getElementById("repeatPasswordAddUser").value;e.length<3?y({text:"The name is less than 3 characters."}).showToast():t.length<3?y({text:"The last name is less than 3 characters."}).showToast():l.length<3?y({text:"The username is less than 3 characters."}).showToast():d.length<8?y({text:"The password is less than 8 characters."}).showToast():d!=n&&y({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&d.length>=8&&n.length>=8&&d===n&&(Bt(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Lt=document.getElementById("canselAddTableUser");Lt.addEventListener("click",function(){ue()});function ue(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const At=document.querySelectorAll(".accessLevelAdd");At.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let W=0;async function Bt(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value,o=new FormData;o.append("first_name",e),o.append("last_name",t),o.append("auth_name",l),o.append("role",d),o.append("password",n),o.append("password_confirmation",s),console.log("AddUser"),It(),U.forEach(a=>{o.append(`permission_name[${W++}]`,a)}),await E({method:"post",url:"add-member",data:o,headers:{"Content-Type":"multipart/form-data"},callback:function(a){T.push(a.data.user);let c=document.createElement("tr");c.setAttribute("id",`tr${a.data.user.id}`),c.setAttribute("data-id",`${a.data.user.id}`),A.push({id:a.data.user.id,name:a.data.user.first_name,family:a.data.user.last_name,authName:a.data.user.auth_name,permission:a.data.permission_name,role:a.data.role});for(let i=1;i<=8;i++){let m=document.createElement("td");if(m.setAttribute("class",`td${i}`),i==1)console.log(T.length),m.innerHTML=T.length;else if(i==2)m.innerHTML=document.getElementById("nameInputAddUser").value;else if(i==3)m.innerHTML=document.getElementById("familyInputAddUser").value;else if(i==4)m.innerHTML=document.getElementById("authNameInputAddUser").value;else if(i==5){let u=document.createElement("span");u.innerHTML=document.getElementById("selectAddUser").value,m.appendChild(u),a.data.role=="expert"?u.setAttribute("class","badge text-bg-primary fs-5"):a.data.role=="visitor"&&u.setAttribute("class","badge text-bg-success fs-5")}else if(i==6){let u=`
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
            `;m.insertAdjacentHTML("afterbegin",u)}else if(i==7){let u=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}else if(i==8){let u=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}c.appendChild(m)}document.getElementById("tBody").appendChild(c),ue(),$e(),qe(),y({text:a.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Mt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Mt;let kt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=kt;window.onload=function(){qt()};let fe=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){xe(),Ce();const e=this.dataset.id;R(e),document.getElementById("idLoading").style.display="flex"});let A=[],Ue,le=!1,ye=1,T=[];async function Ce(){if(le)return;le=!0,await E({url:"show-all-users?paginate=30",callback:function(t){ye=1,A=[],fe&&(document.getElementById("tBody").innerHTML=""),fe=!0;let l=t.data.user.length;for(let d=0;d<l;d++){T.push(t.data.user[d]);let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),n.setAttribute("data-id",`${t.data.user[d].id}`),A.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,permission:t.data.user[d].permissions,role:t.data.user[d].roles[0]});for(let s=1;s<=8;s++){let o=document.createElement("td");if(o.setAttribute("class",`td${s}`),s==1)o.innerHTML=ye++;else if(s==2)o.innerHTML=t.data.user[d].first_name;else if(s==3)o.innerHTML=t.data.user[d].last_name;else if(s==4)o.innerHTML=t.data.user[d].auth_name;else if(s==5){let a=document.createElement("span");a.innerHTML=t.data.user[d].roles[0],o.appendChild(a),t.data.user[d].roles[0]=="admin"?a.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?a.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&a.setAttribute("class","badge text-bg-success fs-5")}else if(s==6){let a=`
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
            `;o.insertAdjacentHTML("afterbegin",a)}else if(s==7){let a=`<svg
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
        </svg>`;o.insertAdjacentHTML("afterbegin",a)}else if(s==8)if(d!=0){let a=`<svg
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
        </svg>`;o.insertAdjacentHTML("afterbegin",a)}else{let a=document.createElement("p");a.innerHTML="____",o.appendChild(a)}n.appendChild(o)}document.getElementById("tBody").appendChild(n)}e(t)}}),le=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,d=t.data.user;for(let n=0;n<l;n++)d[n].id}$e(),qe()}function qe(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,Ue=t.id})})}let xt=document.getElementById("removeUserModalClick");xt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ut(Ue)});let me;function $e(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){U=[],document.getElementById("divShowPermission").innerHTML="";const l=A.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++){let n=l.permission[d],s=document.createElement("p");s.innerHTML=n,document.getElementById("divShowPermission").appendChild(s)}})}),e.forEach(t=>{t.addEventListener("click",function(){t.id==1?(document.getElementById("roleEditUser").style.display="none",document.getElementById("divEditUsers").style.display="none"):(document.getElementById("roleEditUser").style.display="block",document.getElementById("divEditUsers").style.display="block"),document.getElementById("divShowPermission").innerHTML="",console.log(A);let l=[];l=A.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++)document.querySelectorAll("#divEditUsers input").forEach(s=>{s.checked=!1});console.log(l.permission);for(let n=0;n<l.permission.length;n++){let s=l.permission[n];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(o=>{let a=document.querySelector(`label[for='${o.id}']`);if(s===a.innerHTML){let c=document.createElement("p");c.innerHTML=s,document.getElementById("divShowPermission").appendChild(c),o.checked=!0}}),document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckboxEdit").forEach(o=>{let a=document.querySelector(`label[for='${o.id}']`);if(s===a.innerHTML){let c=document.createElement("p");c.innerHTML=s,document.getElementById("divShowPermission").appendChild(c),o.checked=!0}})}me=t;let d=A.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role,Et(d.role))})})}let Tt=document.getElementById("addEditUser");Tt.addEventListener("click",function(){W=0,document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ct(me.id)});async function Ut(e){await E({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),T=T.filter(n=>n.id!=t.data.id);for(let n=1;n<=T.length;n++){let s=T[n-1].id;document.querySelector(`[data-id="${s}"] .td1`).innerHTML=n}y({text:t.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ct(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,s=document.getElementById("selectEditUser").value,o=document.getElementById("passwordEditUser").value,a=document.getElementById("repeatPasswordEditUser").value,c=new FormData;c.append("user_id",t),c.append("first_name",l),c.append("last_name",d),c.append("auth_name",n),c.append("role",s),c.append("password",o),c.append("password_confirmation",a),wt(),U.forEach(i=>{c.append(`permission_name[${W++}]`,i)}),await E({method:"post",url:"edit_member",data:c,headers:{"Content-Type":"multipart/form-data"},callback:function(i){A.forEach(v=>{v.id==i.data.user.id&&(v.name=i.data.user.name,v.family=i.data.user.family,v.authName=i.data.user.authName,v.role=i.data.user.role,v.permission=i.data.user.permissions)});let m=A.findIndex(v=>v.id==me.id);m!=-1&&(A[m].id=i.data.user.id,A[m].name=i.data.user.first_name,A[m].family=i.data.user.last_name,A[m].authName=i.data.user.auth_name,A[m].role=i.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=i.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=i.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=i.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=i.data.user.roles;let u=document.querySelector(`#tr${i.data.user.id} .td5 span`);u.innerHTML=="expert"?(u.classList.remove("text-bg-success"),u.classList.add("text-bg-primary")):u.innerHTML=="visitor"&&(u.classList.remove("text-bg-primary"),u.classList.add("text-bg-success")),y({text:i.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let B,_e,b=[],S,He=!1,Pe=!1;function Ne(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let De="",Ee,se,oe=[];async function qt(){await E({url:"get-me",callback:function(l){se=l.data.user.permissionServerIds,Ee=l.data.user.roles[0],S=l.data.user.permissions,rt(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await E({url:"show-all-servers",callback:function(l){B=l.data;for(let d=0;d<l.data.length;d++)oe.push(l.data[d].id),b.push({numberOfServers:l.data.length,nameServer:l.data[d].name,serverStatus:l.data[d].is_down});Pt(B)}}),document.getElementById("idLoading").style.display="none",Gt();const e=document.querySelectorAll(".Server");Re(e);const t=document.querySelectorAll(".editServer");je(t),De=Ne(S[0]),S.includes("user")?z(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),z(1)),S.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),M=M.filter(l=>l!=1)),S.includes("VM/create")||document.getElementById("iconAddServer").remove(),S.includes("VM/update")||document.querySelectorAll(".editServer").forEach(l=>{l.remove()}),S.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.remove()}),S.includes("module/read")||(document.getElementById("v-module-tab").remove(),M=M.filter(l=>l!=5)),S.includes("module/create")||document.getElementById("addModal").remove(),S.includes("module/update")||(He=!0,document.getElementById("thEditModule").remove()),S.includes("module/delete")||(Pe=!0,document.getElementById("thRemoveModule").remove()),S.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(l=>{l.remove()}),document.querySelectorAll(".divIconPlay").forEach(l=>{l.remove()})),S.includes("log")||(document.getElementById("v-log-tab").remove(),M=M.filter(l=>l!=4)),S.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),M=M.filter(l=>l!=3)),Ee!="admin"&&oe.filter(d=>!se.includes(d)).forEach(d=>{document.querySelector(`.info-box[data-server-id='${d}']`).remove()})}function Ve(){He&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function ze(){Pe&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function Re(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",$t(l)})}let k;function je(e){e.forEach(t=>{t.addEventListener("click",function(){let l=B.find(s=>s.id==this.dataset.id);_e=this.dataset.id;let d=l.name,n=l.ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n})})}async function $t(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await E({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(){localStorage.setItem("userNameServer",t),localStorage.setItem("passwordServer",l),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function _t(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await E({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l},callback:function(d){let n=0,s=d.data.name,o=d.data.ip;document.getElementById("nameServer"+e).innerHTML=s,document.getElementById("ipServer"+e).innerHTML=o,B.find(c=>(n++,c.id==e))&&(B[n-1].name=s,B[n-1].ip=o),y({text:d.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ht=document.getElementById("subServer");Ht.addEventListener("click",function(){_t(_e)});let F,O,Fe,re,ie,H,be;function Pt(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(d=>{H=document.createElement("div"),e[t].is_down==0?H.className="info-box host col-3 ms-5":H.className="info-box off col-3 ms-5",H.setAttribute("data-server-id",`${e[t].id}`),t++,H.innerHTML=`
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
  `,l.appendChild(H)}),Oe(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Nt(O)}),Ze(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Dt(F)}),We(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?y({text:"The name is less than 3 characters."}).showToast():n.length<8&&y({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Vt(Fe),document.getElementById("idLoading").style.display="flex")}),Ge(),Je(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?y({text:"The name is less than 3 characters."}).showToast():n.length<7&&y({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(zt(),document.getElementById("idLoading").style.display="flex")})}function Oe(){be=document.querySelectorAll(".divIconPause"),be.forEach(e=>{e.addEventListener("click",function(){re=e.id,F=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Ze(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){ie=t.id,O=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function We(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Fe=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function Nt(e){await E({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=b.findIndex(n=>n.nameServer===t.data.name);l!==-1&&(b[l].serverStatus=0);let d=t.msg;document.getElementById(`${ie}`).classList.remove("d-flex"),document.getElementById(`${ie}`).classList.add("d-none"),document.getElementById(`iconPause${O}`).classList.remove("d-none"),document.getElementById(`iconPause${O}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),y({text:d}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Dt(e){await E({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,d=b.findIndex(n=>n.nameServer===t.data.name);d!==-1&&(b[d].serverStatus=1),document.getElementById(`${re}`).classList.remove("d-flex"),document.getElementById(`${re}`).classList.add("d-none"),document.getElementById(`iconPlay${F}`).classList.remove("d-none"),document.getElementById(`iconPlay${F}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),y({text:l}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Vt(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await E({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(d){b=b.filter(o=>o.nameServer!==d.data.name);let s=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),y({text:s}).showToast()}}),document.getElementById("idLoading").style.display="none"}function Ge(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("data-id"),l=document.getElementById("nameServer"+t).innerHTML;localStorage.setItem("nameServer",l),document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Je(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="/etc/bbdh",document.getElementById("addPathRunConfigServer").value="/usr/bin"})}async function zt(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,d=document.querySelector('input[name="nameAddPathConfigServer"]').value,n=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await E({method:"post",url:"create-server",data:{name:t,ip:l,path_config:d,path_run_config:n},callback:function(a){oe.push(a.data.id),se.push(a.data.id),b.push({numberOfServers:b.length,nameServer:a.data.name}),B.push(a.data);const c=document.createElement("div");c.className="info-box host col-3 ms-5",c.setAttribute("data-server-id",`${a.data.id}`),c.innerHTML=`
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
  `,e.appendChild(c),Je(),Ge(),y({text:a.msg}).showToast()}}),Oe(),Ze(),We();const s=document.querySelectorAll(".Server");Re(s);const o=document.querySelectorAll(".editServer");je(o),document.getElementById("idLoading").style.display="none"}let Ie=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",k==0&&(k=1),he(k);const e=this.dataset.id;x(e)});let we,ne=!1;async function he(e=1){if(ne)return;ne=!0;let t=[],l;await E({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var c,i,m,u,v,f;t.push(d.data.data),Ie&&(document.getElementById("tBody2").innerHTML=""),Ie=!0;let n=Math.ceil(d.data.total/20),s;e==1,s=(e-1)*20,s++;let o=d.data.data.length;for(let h=0;h<o;h++){let r=document.createElement("tr");for(let g=1;g<=5;g++){let p=document.createElement("td");if(g==1)p.innerHTML=s++;else if(g==2){let L=document.createElement("span"),N=document.createElement("span");L.setAttribute("class","mx-2"),N.setAttribute("class","mx-2");let $=document.createElement("div");$.setAttribute("class","mt-2"),L.innerHTML=((i=(c=d.data.data[h].properties)==null?void 0:c.user)==null?void 0:i.first_name)||"-",N.innerHTML=((u=(m=d.data.data[h].properties)==null?void 0:m.user)==null?void 0:u.last_name)||"-",$.innerHTML=((f=(v=d.data.data[h].properties)==null?void 0:v.user)==null?void 0:f.auth_name)||"-",p.appendChild(L),p.appendChild(N),p.appendChild($),$.classList.add("fontSize")}else if(g==3)p.innerHTML=d.data.data[h].event;else if(g==4){p.innerHTML=d.data.data[h].description;const L=document.createElement("div");L.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${h} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,p.appendChild(L)}else if(g==5){let L=new Date(d.data.data[h].created_at).toLocaleString();p.innerHTML=L}r.appendChild(p)}document.getElementById("tBody2").appendChild(r)}l=n,a(l,we);function a(h,r=k||1){const g=document.getElementById("pagination");if(g.innerHTML="",h!=1){const p=document.createElement("li");p.className=`page-item ${r===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',g.appendChild(p);const L=document.createElement("li");L.className=`page-item ${r===1?"disabled":""}`,L.innerHTML=`<a class="page-link" href="#" data-page="${r-1}">Previous Page</a>`,g.appendChild(L);const N=r===1?r:r-1,$=r===h?r:Math.min(r+1,h);for(let _=Math.max(1,N-1);_<=Math.min(h,$+1);_++){const X=document.createElement("li");X.className=`page-item ${_===r?"active":""}`,X.innerHTML=`<a class="page-link ${_===r?"active-page":""}" href="#" data-page="${_}">${_}</a>`,g.appendChild(X)}const K=document.createElement("li");K.className=`page-item ${r===h?"disabled":""}`,K.innerHTML=`<a class="page-link" href="#" data-page="${r+1}">Next Page</a>`,g.appendChild(K);const Q=document.createElement("li");Q.className=`page-item ${r===h?"disabled":""}`,Q.innerHTML=`<a class="page-link" href="#" data-page="${h}">Last Page</a>`,g.appendChild(Q);const pe=new URL(window.location);pe.searchParams.set("log",r||1),window.history.pushState({},"",pe)}}}}),ne=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=l&&(document.getElementById("idLoading").style.display="flex",we=s,he(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){const n=this.dataset.idLog,o=t[0][n],a=document.getElementById("formLog");a.innerHTML="",o?c(o,a):a.innerHTML='<p class="highlight">No data found for the given ID.</p>';function c(m,u,v=0){const f=document.createElement("ul");f.style.marginLeft=`${v*5}px`;let h;for(const r in m)if(r!="id"&&r!="subject_type"&&r!="subject_id"&&r!="causer_type"&&r!="causer_id"&&r!="batch_uuid"&&m.hasOwnProperty(r)){const g=m[r],p=document.createElement("li");if(r==="changes"&&p.classList.add("changes-highlight"),typeof g=="object"&&g!==null)p.innerHTML=`<strong>${r}:</strong>`,f.appendChild(p),c(g,p,v+1);else if(typeof g=="string"&&i(g)){p.innerHTML=`<strong>${r}:</strong>`,f.appendChild(p);const L=JSON.parse(g);c(L,p,v+1)}else r=="updated_at"||r=="created_at"?h=new Date(g).toLocaleString():h=g,p.innerHTML=`<strong>${r}:</strong> <span class="highlight">${h}</span>`,f.appendChild(p)}u.appendChild(f)}function i(m){try{JSON.parse(m)}catch{return!1}return!0}})})}let I=[],ae=!1,D,P,Se=1,C=[];async function Ke(){document.getElementById("idLoading").style.display="flex",!ae&&(ae=!0,await E({url:"show-all-modules",callback:function(e){console.log(e),Se=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){C.push(e.module[l].module_id),P=l+1,I.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${l+1}`),d.setAttribute("data-id",`${e.module[l].module_id}`);for(let n=1;n<=6;n++){let s=document.createElement("td");if(s.setAttribute("class",`td${n}`),n==1)s.innerHTML=Se++;else if(n==2)s.innerHTML=e.module[l].module_name;else if(n==3){let o;o=e.module[l].server_ids;let a=document.createElement("span"),c=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");a.innerHTML=c,s.appendChild(a)}else if(n==4){let o=e.module[l].module_type.toUpperCase(),a=JSON.stringify(o).replace(/[\[\]"\s\\]+/g,"");s.innerHTML=a}else if(n==5){s.setAttribute("class","td5 tdEditModule");let o=`<svg
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
        </svg>`;s.insertAdjacentHTML("afterbegin",o)}else if(n==6){s.setAttribute("class","td6 tdRemoveModule");let o=`<svg 
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
           </svg>`;s.insertAdjacentHTML("afterbegin",o)}d.appendChild(s)}document.getElementById("tBody3").appendChild(d)}}}),Qe(),tt(),ae=!1,document.getElementById("idLoading").style.display="none",ze(),Ve())}document.getElementById("buttonIframe1").addEventListener("click",function(){Xe("iframe_a","url_input_a"),lt()});document.getElementById("buttonIframe2").addEventListener("click",function(){Xe("iframe_b","url_input_b"),lt()});function Qe(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){D=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",jt(d),Rt()})})}function Xe(e,t){const l=document.getElementById(t),d=document.getElementsByName(e)[0];l&&d&&(d.src=l.value)}function Rt(){let e;for(let n=0;n<I.length;n++)I[n].moduleID==ge&&(e=I[n].moduleType);const t=e.map(n=>n.toLowerCase()),l=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,l.checked=!0)}let ge,V=[];function jt(e){let t=I[e-1].serverIDs,l=t.length;ge=I[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let d=b.length;for(let n=1;n<=d;n++){let s=B[n-1].id,o=document.createElement("div");o.setAttribute("class","form-check");let a=document.createElement("input");a.setAttribute("class","form-check-input editModalCheckbox"),a.setAttribute("data-server-id",`${s}`),a.setAttribute("value",""),a.setAttribute("type","checkbox"),a.setAttribute("id",`selectServer${s}`);let c=document.createElement("label");c.setAttribute("class","form-check-label"),c.setAttribute("for",`selectServer${s}`),c.innerHTML=`${b[n-1].nameServer}`,o.appendChild(a),o.appendChild(c),document.getElementById("ServerEditModule").appendChild(o)}V=[];for(let n=0;n<l;n++)V.push(t[n]),document.getElementById(`selectServer${t[n]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ft(ge)});async function Ft(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,s=document.getElementById("moduleType5GC"),o=document.getElementById("moduleTypeEPC");s.checked?n="5gc":o.checked&&(n="Epc");let a=document.querySelector('input[name="name_InputUserNameModule"]').value,c=document.querySelector('input[name="name_InputPasswordModule"]').value,i=[];document.querySelectorAll(".editModalCheckbox").forEach(v=>{v.checked&&i.push(Number(v.getAttribute("data-server-id")))});let m=new FormData;m.append("module_id",e),m.append("name",t),d&&m.append("config_file",d),m.append("type",n),i.forEach(v=>{m.append("server_ids[]",v)}),m.append("username",a),m.append("password",c);let u=document.getElementById("saveValue");await E({url:"edit-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(v){let f=v.module.module_server.length,h=v.module.module_server;for(let r=0;r<I.length;r++)if(I[r].moduleID==e){I[r].serverIDs.length=0;for(let g=0;g<h.length;g++)I[r].serverIDs.push(h[g])}for(let r=0;r<I.length;r++)I[r].moduleType.length=0,I[r].moduleID==e&&I[r].moduleType.push(v.module.module_type);V=[];for(let r=0;r<f;r++)V.push(v.module.module_server[r]),document.getElementById(`selectServer${h[r]}`).checked=!0;if(V.length===0)document.querySelector(`#tr${D} .td3`).innerHTML="";else{u.checked&&(localStorage.setItem("userNameServer",a),localStorage.setItem("passwordServer",c)),document.querySelector(`#tr${D} .td2`).innerHTML=v.module.module_name;let r=v.module.module_server,g=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${D} .td3`).innerHTML=g,document.querySelector(`#tr${D} .td4`).innerHTML=v.module.module_type.toUpperCase()}y({text:v.message}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ye,et;function tt(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,et=`#tr${e.id}`,Ye=I[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){Ot()});async function Ot(){await E({url:"delete-module",method:"delete",data:{module_id:Ye},callback:function(e){C=C.filter(l=>l!=e.module.id),document.querySelector(`${et}`).remove();for(let l=1;l<=C.length;l++){let d=C[l-1];document.querySelector(`[data-id="${d}"] .td1`).innerHTML=l}y({text:e.msg}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(B),console.log(b),document.getElementById("ServerAddModule").innerHTML="",Zt();for(let l=0;l<b.length;l++)if(b[l].serverStatus==1){for(let d=0;d<b.length;d++)if(B[l].name==b[d].nameServer){console.log(B[l].id);let n=B[l].id;console.log(n),console.log(document.getElementById(`selectServer${n}`)),document.getElementById(`selectServer${n}`).disabled=!0}}});function Zt(){let e=b.length;for(let t=1;t<=e;t++){let l=B[t-1].id,d=document.createElement("div");d.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input addModalCheckbox"),n.setAttribute("data-server-id",`${l}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${l}`);let s=document.createElement("label");s.setAttribute("class","form-check-label"),s.setAttribute("for",`selectServer${l}`),s.innerHTML=`${b[t-1].nameServer}`,d.appendChild(n),d.appendChild(s),document.getElementById("ServerAddModule").appendChild(d)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let d=document.getElementById("moduleAddName").value,n=document.getElementById("moduleAddFile").value,s=document.querySelectorAll('input[name="flexRadioDefault"]'),o=document.querySelectorAll(".addModalCheckbox"),a=document.getElementById("userNameAddModule").value,c=document.getElementById("passwordAddModule").value;const i=[...s].some(u=>u.checked),m=[...o].some(u=>u.checked);d.length<3?y({text:"The module name is less than 3 characters."}).showToast():n==""?y({text:"No file has been selected."}).showToast():i==!1?y({text:"Select the desired module type."}).showToast():m==!1?y({text:"Select the desired server for the module."}).showToast():a.length<3?y({text:"The username is less than 3 characters."}).showToast():c.length<1&&y({text:"The password does not match the repeat field."}).showToast(),Wt()});async function Wt(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),s=document.getElementById("moduleAddTypeEPC");n.checked&&s.checked?d="Epc, 5gc":n.checked?d="5gc":s.checked&&(d="Epc");let o=document.querySelector('input[name="name_InputUserNameAddModule"]').value,a=document.querySelector('input[name="name_InputPasswordAddModule"]').value,c=[];document.querySelectorAll(".addModalCheckbox").forEach(u=>{u.checked&&c.push(Number(u.getAttribute("data-server-id")))});let i=new FormData;i.append("name",e),l&&i.append("config_file",l),i.append("type",d);let m=0;c.forEach(u=>{i.append(`server_id[${m}]`,u),m++}),i.append("username",o),i.append("password",a),await E({url:"create-module",method:"post",data:i,headers:{"Content-Type":"multipart/form-data"},callback:function(u){let v=[];console.log(u),C.push(u.data.created_modules[0].module.module_id);for(let h=0;h<u.data.created_modules.length;h++)v.push(u.data.created_modules[h].server.server_id);let f=document.createElement("tr");f.setAttribute("id",`tr${++P}`),f.setAttribute("data-id",`${u.data.created_modules[0].module.module_id}`),I.push({serverIDs:v,moduleID:u.data.created_modules[0].module.module_id,moduleType:[u.data.created_modules[0].module.module_type]});for(let h=1;h<=6;h++){let r=document.createElement("td");if(r.setAttribute("class",`td${h}`),h==1)r.innerHTML=C.length;else if(h==2)r.innerHTML=document.getElementById("moduleAddName").value;else if(h==3){let g=[];for(let p=0;p<u.data.created_modules.length;p++)g.push(u.data.created_modules[p].server.server_id);r.innerHTML=g.join(", ")}else if(h==4){let g=[];for(let p=0;p<1;p++)g.push(u.data.created_modules[p].module.module_type.toUpperCase());r.innerHTML=g.join(", ")}else if(h==5){r.setAttribute("class","td5 tdEditModule");let g=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",g)}else if(h==6){r.setAttribute("class","td5 tdRemoveModule");let g=`<svg 
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
         </svg>`;r.insertAdjacentHTML("afterbegin",g)}f.appendChild(r)}document.getElementById("tBody3").appendChild(f),Qe(),tt(),y({text:u.msg}).showToast()}}),document.getElementById("idLoading").style.display="none",ze(),Ve()}async function dt(){await E({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function lt(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await E({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function nt(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const Le=document.getElementById("IframeZobbix"),G=Le.contentDocument||Le.contentWindow.document;G.open();G.write(`
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
`);J.close();const st=J.querySelector(".imgMonitoringELK");st.style.width="100%";st.style.height="550px";const ve=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function ce(){return window.location.hash||De||Ne(S[0])}const Gt=()=>{let e=ce();document.querySelector(e)&&(ot(e),ve(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ve(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){ve(ce()),ot(ce())})});let Be=!0;function ot(e){let l=new URL(window.location).searchParams.get("log");if(k=Number(l),document.querySelectorAll(".tab-pane").forEach(d=>{d.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(d=>{d.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),Be){switch(e){case"#v-servers-home":x(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":R(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":R(2),Ce(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",dt(),x(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":x(4),k==0&&(k=1),he(k),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":x(5),Ke(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}Be=!1}}
