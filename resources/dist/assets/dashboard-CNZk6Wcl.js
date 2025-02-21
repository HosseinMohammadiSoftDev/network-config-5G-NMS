import{T as f,u as y}from"./useApi-Mgb1BH1A.js";import{s as rt}from"./auth-CIdfLHBs.js";function R(e){for(let t=1;t<=e;t++)document.querySelector(".subMenu"+t).classList.remove("clickSubMenu")}let M=[1,2,3,4,5];function Me(){for(let e=1;e<=M.length;e++)document.querySelector(".menus"+M[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;C(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;C(e),dt(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;C(e),x=[],Ke()});function C(e){nt(),Me(),R(),ke(),document.querySelector(".menus"+e).classList.add("activeMenu")}function ke(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;z(e)});function z(e){nt(),Me(),R(),ke(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let X=!1,it=document.getElementById("showPasswordAddUser");it.addEventListener("click",function(){ct()});function ct(){X?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",X=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",X=!0)}let ee=!1,ut=document.getElementById("showPasswordEditUser");ut.addEventListener("click",function(){mt()});function mt(){ee?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",ee=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",ee=!0)}let te=!1,gt=document.getElementById("showPasswordShowConfig");gt.addEventListener("click",function(){ht()});function ht(){te?(document.getElementById("passwordShowConfig").type="password",te=!1):(document.getElementById("passwordShowConfig").type="text",te=!0)}let de=!1,vt=document.getElementById("showPasswordDeletServer");vt.addEventListener("click",function(){pt()});function pt(){de?(document.getElementById("passwordDeletServer").type="password",de=!1):(document.getElementById("passwordDeletServer").type="text",de=!0)}async function xe(){await y({url:"show-all-permission",callback:function(e){console.log(e),document.getElementById("showAccessLevel").innerHTML="",document.getElementById("divAccessLevelEdit").innerHTML="";for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckbox"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevel${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevel${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("showAccessLevel").appendChild(l)}for(let t=0;t<e.data.length;t++){let l=document.createElement("div");l.setAttribute("class","form-check");let d=document.createElement("input");d.setAttribute("class","form-check-input accessLevelCheckboxEdit"),d.setAttribute("type","checkbox"),d.setAttribute("id",`selectAccessLevelEdit${t+1}`),d.setAttribute("data-id",e.data[t]),d.setAttribute("required","required");let n=document.createElement("label");n.setAttribute("class","form-check-label"),n.setAttribute("for",`selectAccessLevelEdit${t+1}`),n.innerHTML=`${e.data[t]}`,l.appendChild(n),l.appendChild(d),document.getElementById("divAccessLevelEdit").appendChild(l)}}}),Te()}xe();let Z,j,_=[],S;async function Te(){document.getElementById("idLoadingPermission").style.display="flex",document.getElementById("showAccessLevel").style.display="none",document.getElementById("divPasswordAddUser").classList.add("margin_top"),await y({url:"show-all-roles",callback:function(n){n.data[0],Z=n.data[1],j=n.data[2],S=document.querySelectorAll('input[type="checkbox"][data-id]'),_=[],S.forEach(s=>{_.push(s.getAttribute("data-id"))}),S.forEach(s=>{j.permissions.some(a=>a===s.getAttribute("data-id"))&&(s.checked=!0),s.disabled=!1})}}),document.getElementById("idLoadingPermission").style.display="none",document.getElementById("showAccessLevel").style.display="block",document.getElementById("divPasswordAddUser").classList.remove("margin_top");let e,t=13,l=[];document.querySelectorAll(".accessLevelCheckbox").forEach(n=>{l.push(n.id)}),S.forEach(n=>{n.addEventListener("change",()=>{let s=document.getElementById("selectAccessLevel1"),o=document.getElementById("selectAccessLevel2"),a=document.getElementById("selectAccessLevel3"),i=document.getElementById("selectAccessLevel4"),c=document.getElementById("selectAccessLevel9"),m=document.getElementById("selectAccessLevel5"),g=document.getElementById("selectAccessLevel6"),v=document.getElementById("selectAccessLevel7"),E=document.getElementById("selectAccessLevel8");if((o.checked||a.checked||i.checked||c.checked)&&(s.checked=!0),s.checked?m.checked=!0:m.checked=!1,(g.checked||v.checked||E.checked)&&(m.checked=!0),s.checked){let u=!1;for(let r=13;r<=l.length;r++)if(document.getElementById("selectAccessLevel"+r).checked){e=r,u=!0;break}u||(document.getElementById("selectAccessLevel"+e).checked=!0,f({text:"At least one server option must be selected."}).showToast())}else for(let u=13;u<=l.length;u++)document.getElementById("selectAccessLevel"+u).checked=!1})});let d=[];document.querySelectorAll(".accessLevelCheckboxEdit").forEach(n=>{d.push(n.id)}),S.forEach(n=>{n.addEventListener("change",()=>{let s=document.getElementById("selectAccessLevelEdit1"),o=document.getElementById("selectAccessLevelEdit2"),a=document.getElementById("selectAccessLevelEdit3"),i=document.getElementById("selectAccessLevelEdit4"),c=document.getElementById("selectAccessLevelEdit9"),m=document.getElementById("selectAccessLevelEdit5"),g=document.getElementById("selectAccessLevelEdit6"),v=document.getElementById("selectAccessLevelEdit7"),E=document.getElementById("selectAccessLevelEdit8");if((o.checked||a.checked||i.checked||c.checked)&&(s.checked=!0,m.checked=!0),s.checked?m.checked=!0:m.checked=!1,(g.checked||v.checked||E.checked)&&(m.checked=!0),s.checked){let u=!1;for(let r=13;r<=l.length;r++)if(document.getElementById("selectAccessLevelEdit"+r).checked){t=r,u=!0;break}u||(document.getElementById("selectAccessLevelEdit"+t).checked=!0,f({text:"At least one server option must be selected."}).showToast())}else for(let u=13;u<=l.length;u++)document.getElementById("selectAccessLevelEdit"+u).checked=!1})})}function ft(){S.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(Z.permissions.forEach(e=>{_.includes(e)&&S.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),S.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&j.permissions.forEach(e=>{_.includes(e)&&S.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function yt(){S.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(Z.permissions.forEach(e=>{_.includes(e)&&S.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0)})}),S.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&j.permissions.forEach(e=>{_.includes(e)&&S.forEach(t=>{t.getAttribute("data-id")===e&&(t.checked=!0,t.disabled=!1)})})}function Et(e){S.forEach(t=>{t.disabled=!0}),e==="visitor"?Z.permissions.forEach(t=>{_.includes(t)&&S.forEach(l=>{l.getAttribute("data-id")===t&&(l.disabled=!1)})}):S.forEach(t=>{t.disabled=!1})}document.getElementById("selectAddUser").addEventListener("change",ft);document.getElementById("selectEditUser").addEventListener("change",yt);let bt=document.getElementById("addUserModal");bt.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",U=[],W=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),ue(),Te()});let U=[];function It(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}function wt(){document.querySelectorAll(".accessLevelCheckboxEdit").forEach(function(e){if(e.checked){console.log(e),console.log(U);let t=document.querySelector(`label[for='${e.id}']`);U.push(t.innerHTML)}})}let St=document.getElementById("addTableUsers");St.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.querySelectorAll(".accessLevelCheckbox"),n=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value;const o=[...d].some(a=>a.checked);e.length<3?f({text:"The name is less than 3 characters."}).showToast():t.length<3?f({text:"The last name is less than 3 characters."}).showToast():l.length<3?f({text:"The username is less than 3 characters."}).showToast():o==!1?f({text:"You must select one of the following permissions."}).showToast():n.length<8?f({text:"The password is less than 8 characters."}).showToast():n!=s&&f({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&t.length>=3&&l.length>=3&&o!=!1&&n.length>=8&&s.length>=8&&n===s&&(Bt(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let Lt=document.getElementById("canselAddTableUser");Lt.addEventListener("click",function(){ue()});function ue(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const At=document.querySelectorAll(".accessLevelAdd");At.forEach(function(e){e.addEventListener("click",function(){const t=document.querySelector(`label[for="${this.dataset.id}"]`);t&&t.textContent})});let W=0;async function Bt(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,l=document.getElementById("authNameInputAddUser").value,d=document.getElementById("selectAddUser").value,n=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value,o=new FormData;o.append("first_name",e),o.append("last_name",t),o.append("auth_name",l),o.append("role",d),o.append("password",n),o.append("password_confirmation",s),console.log("AddUser"),It(),U.forEach(a=>{o.append(`permission_name[${W++}]`,a)}),await y({method:"post",url:"add-member",data:o,headers:{"Content-Type":"multipart/form-data"},callback:function(a){k.push(a.data.user);let i=document.createElement("tr");i.setAttribute("id",`tr${a.data.user.id}`),i.setAttribute("data-id",`${a.data.user.id}`),B.push({id:a.data.user.id,name:a.data.user.first_name,family:a.data.user.last_name,authName:a.data.user.auth_name,permission:a.data.permission_name,role:a.data.role});for(let c=1;c<=8;c++){let m=document.createElement("td");if(m.setAttribute("class",`td${c}`),c==1)console.log(k.length),m.innerHTML=k.length;else if(c==2)m.innerHTML=document.getElementById("nameInputAddUser").value;else if(c==3)m.innerHTML=document.getElementById("familyInputAddUser").value;else if(c==4)m.innerHTML=document.getElementById("authNameInputAddUser").value;else if(c==5){let g=document.createElement("span");g.innerHTML=document.getElementById("selectAddUser").value,m.appendChild(g),a.data.role=="expert"?g.setAttribute("class","badge text-bg-primary fs-5"):a.data.role=="visitor"&&g.setAttribute("class","badge text-bg-success fs-5")}else if(c==6){let g=`
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
            `;m.insertAdjacentHTML("afterbegin",g)}else if(c==7){let g=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",g)}else if(c==8){let g=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",g)}i.appendChild(m)}document.getElementById("tBody").appendChild(i),ue(),qe(),_e(),f({text:a.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Mt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=Mt;let kt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=kt;window.onload=function(){_t()};let fe=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){k=[],xe(),Ue();const e=this.dataset.id;z(e),document.getElementById("idLoading").style.display="flex"});let B=[],Ce,le=!1,ye=1,k=[];async function Ue(){if(le)return;le=!0,await y({url:"show-all-users?paginate=30",callback:function(t){ye=1,B=[],fe&&(document.getElementById("tBody").innerHTML=""),fe=!0;let l=t.data.user.length;for(let d=0;d<l;d++){k.push(t.data.user[d]);let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.user[d].id}`),n.setAttribute("data-id",`${t.data.user[d].id}`),B.push({id:t.data.user[d].id,name:t.data.user[d].first_name,family:t.data.user[d].last_name,authName:t.data.user[d].auth_name,permission:t.data.user[d].permissions,role:t.data.user[d].roles[0]});for(let s=1;s<=8;s++){let o=document.createElement("td");if(o.setAttribute("class",`td${s}`),s==1)o.innerHTML=ye++;else if(s==2)o.innerHTML=t.data.user[d].first_name;else if(s==3)o.innerHTML=t.data.user[d].last_name;else if(s==4)o.innerHTML=t.data.user[d].auth_name;else if(s==5){let a=document.createElement("span");a.innerHTML=t.data.user[d].roles[0],o.appendChild(a),t.data.user[d].roles[0]=="admin"?a.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[d].roles[0]=="expert"?a.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[d].roles[0]=="visitor"&&a.setAttribute("class","badge text-bg-success fs-5")}else if(s==6){let a=`
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
        </svg>`;o.insertAdjacentHTML("afterbegin",a)}else{let a=document.createElement("p");a.innerHTML="____",o.appendChild(a)}n.appendChild(o)}document.getElementById("tBody").appendChild(n)}e(t)}}),le=!1,document.getElementById("idLoading").style.display="none";function e(t){let l=t.data.user.length,d=t.data.user;for(let n=0;n<l;n++)d[n].id}qe(),_e()}function _e(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let l=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=l.innerHTML,Ce=t.id})})}let xt=document.getElementById("removeUserModalClick");xt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ct(Ce)});let me;function qe(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(t=>{t.addEventListener("click",function(){U=[],document.getElementById("divShowPermission").innerHTML="";const l=B.find(d=>d.id==this.id);for(let d=0;d<l.permission.length;d++){let n=l.permission[d],s=document.createElement("p");s.innerHTML=n,document.getElementById("divShowPermission").appendChild(s)}})}),e.forEach(t=>{t.addEventListener("click",function(){t.id==1?(document.getElementById("roleEditUser").style.display="none",document.getElementById("divEditUsers").style.display="none"):(document.getElementById("roleEditUser").style.display="block",document.getElementById("divEditUsers").style.display="block"),document.getElementById("divShowPermission").innerHTML="";let l=[];l=B.find(n=>n.id==this.id);for(let n=0;n<l.permission.length;n++)document.querySelectorAll("#divEditUsers input").forEach(s=>{s.checked=!1});for(let n=0;n<l.permission.length;n++){let s=l.permission[n];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(o=>{let a=document.querySelector(`label[for='${o.id}']`);if(s===a.innerHTML){let i=document.createElement("p");i.innerHTML=s,document.getElementById("divShowPermission").appendChild(i),o.checked=!0}}),document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckboxEdit").forEach(o=>{let a=document.querySelector(`label[for='${o.id}']`);if(s===a.innerHTML){let i=document.createElement("p");i.innerHTML=s,document.getElementById("divShowPermission").appendChild(i),o.checked=!0}})}me=t;let d=B.find(n=>n.id==t.id);d!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=d.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=d.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=d.authName,document.getElementById("selectEditUser").value=d.role,Et(d.role))})})}let Tt=document.getElementById("addEditUser");Tt.addEventListener("click",function(){W=0,document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ut(me.id)});async function Ct(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(t){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),k=k.filter(n=>n.id!=t.data.id);for(let n=1;n<=k.length;n++){let s=k[n-1].id;document.querySelector(`[data-id="${s}"] .td1`).innerHTML=n}f({text:t.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Ut(e){let t=Number(e),l=document.getElementById("nameInputEditUser").value,d=document.getElementById("familyInputEditUser").value,n=document.getElementById("authNameInputEditUser").value,s=document.getElementById("selectEditUser").value,o=document.getElementById("passwordEditUser").value,a=document.getElementById("repeatPasswordEditUser").value,i=new FormData;i.append("user_id",t),i.append("first_name",l),i.append("last_name",d),i.append("auth_name",n),i.append("role",s),i.append("password",o),i.append("password_confirmation",a),wt(),U.forEach(c=>{i.append(`permission_name[${W++}]`,c)}),await y({method:"post",url:"edit_member",data:i,headers:{"Content-Type":"multipart/form-data"},callback:function(c){B.forEach(v=>{v.id==c.data.user.id&&(v.name=c.data.user.name,v.family=c.data.user.family,v.authName=c.data.user.authName,v.role=c.data.user.role,v.permission=c.data.user.permissions)});let m=B.findIndex(v=>v.id==me.id);m!=-1&&(B[m].id=c.data.user.id,B[m].name=c.data.user.first_name,B[m].family=c.data.user.last_name,B[m].authName=c.data.user.auth_name,B[m].role=c.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=c.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=c.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=c.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=c.data.user.roles;let g=document.querySelector(`#tr${c.data.user.id} .td5 span`);g.innerHTML=="expert"?(g.classList.remove("text-bg-success"),g.classList.add("text-bg-primary")):g.innerHTML=="visitor"&&(g.classList.remove("text-bg-primary"),g.classList.add("text-bg-success")),f({text:c.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let b,$e,I=[],L,He=!1,Pe=!1;function Ne(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let De="",Ee,se,oe=[];async function _t(){await y({url:"get-me",callback:function(l){se=l.data.user.permissionServerIds,Ee=l.data.user.roles[0],L=l.data.user.permissions,rt(l.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(l){b=l.data;for(let d=0;d<l.data.length;d++)oe.push(l.data[d].id),I.push({numberOfServers:l.data.length,nameServer:l.data[d].name,serverStatus:l.data[d].is_down});Pt(b)}}),document.getElementById("idLoading").style.display="none",Gt();const e=document.querySelectorAll(".Server");ze(e);const t=document.querySelectorAll(".editServer");je(t),De=Ne(L[0]),L.includes("user")?R(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),R(1)),L.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),M=M.filter(l=>l!=1)),L.includes("VM/create")||document.getElementById("iconAddServer").remove(),L.includes("VM/update")||document.querySelectorAll(".editServer").forEach(l=>{l.remove()}),L.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.remove()}),L.includes("module/read")||(document.getElementById("v-module-tab").remove(),M=M.filter(l=>l!=5)),L.includes("module/create")||document.getElementById("addModal").remove(),L.includes("module/update")||(He=!0,document.getElementById("thEditModule").remove()),L.includes("module/delete")||(Pe=!0,document.getElementById("thRemoveModule").remove()),L.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(l=>{l.remove()}),document.querySelectorAll(".divIconPlay").forEach(l=>{l.remove()})),L.includes("log")||(document.getElementById("v-log-tab").remove(),M=M.filter(l=>l!=4)),L.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),M=M.filter(l=>l!=3)),Ee!="admin"&&oe.filter(d=>!se.includes(d)).forEach(d=>{document.querySelector(`.info-box[data-server-id='${d}']`).remove()})}function Ve(){He&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function Re(){Pe&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function ze(e){const t=document.getElementById("subShowConfigModule");let l;e.forEach(d=>{d.addEventListener("click",function(){l=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",qt(l)})}let T;function je(e){e.forEach(t=>{t.addEventListener("click",function(){let l=b.find(a=>a.id==this.dataset.id);$e=this.dataset.id;let d=l.name,n=l.ip,s=l.path_config,o=l.path_run_config;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=n,document.querySelector('input[name="nameEditPathConfigServer"]').value=s,document.querySelector('input[name="nameEditPathRunConfigServer"]').value=o})})}async function qt(e){let t=document.querySelector('input[name="nameUserNameShowConfig"]').value,l=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:t,password:l},callback:function(){localStorage.setItem("userNameServer",t),localStorage.setItem("passwordServer",l),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function $t(e){let t=document.getElementById("editNameServer").value,l=document.getElementById("editIpServer").value,d=document.getElementById("editPathConfigServer").value,n=document.getElementById("editPathRunConfigServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:l,path_config:d,path_run_config:n},callback:function(s){let o=0,a=s.data.name,i=s.data.ip;document.getElementById("nameServer"+e).innerHTML=a,document.getElementById("ipServer"+e).innerHTML=i,b.find(m=>(o++,m.id==e))&&(b[o-1].name=a,b[o-1].ip=i,b[o-1].path_config=s.data.path_config,b[o-1].path_run_config=s.data.path_run_config),f({text:s.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Ht=document.getElementById("subServer");Ht.addEventListener("click",function(){$t($e)});let F,O,Fe,re,ie,H,be;function Pt(e){let t=0;const l=document.querySelector("#cardContainer");e.forEach(d=>{H=document.createElement("div"),e[t].is_down==0?H.className="info-box host col-3 ms-5":H.className="info-box off col-3 ms-5",H.setAttribute("data-server-id",`${e[t].id}`),t++,H.innerHTML=`
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
  `,l.appendChild(H)}),Oe(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Nt(O)}),Ze(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Dt(F)}),We(),document.getElementById("subDeletServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameUserNameDeletServer"]').value,n=document.querySelector('input[name="namePasswordDeletServer"]').value;d.length<3?f({text:"The name is less than 3 characters."}).showToast():n.length<8&&f({text:"The password is less than 8 characters."}).showToast(),d.length>=3&&n.length>=8&&(Vt(Fe),document.getElementById("idLoading").style.display="flex")}),Ge(),Je(),document.getElementById("subAddServer").addEventListener("click",function(){let d=document.querySelector('input[name="nameAddNameServer"]').value,n=document.querySelector('input[name="nameAddIpServer"]').value;d.length<3?f({text:"The name is less than 3 characters."}).showToast():n.length<7&&f({text:"The IP is less than 7 characters."}).showToast(),d.length>=3&&n.length>=7&&(Rt(),document.getElementById("idLoading").style.display="flex")})}function Oe(){be=document.querySelectorAll(".divIconPause"),be.forEach(e=>{e.addEventListener("click",function(){re=e.id,F=this.dataset.serverPauseId;let t=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=t})})}function Ze(){document.querySelectorAll(".divIconPlay").forEach(t=>{t.addEventListener("click",function(){ie=t.id,O=this.dataset.serverPlayId;let l=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=l})})}function We(){document.querySelectorAll(".divIconRemoveServer").forEach(t=>{t.addEventListener("click",function(){Fe=this.dataset.serverTrashId;let l=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${l}\``})})}async function Nt(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(t){let l=I.findIndex(n=>n.nameServer===t.data.name);l!==-1&&(I[l].serverStatus=0);let d=t.msg;document.getElementById(`${ie}`).classList.remove("d-flex"),document.getElementById(`${ie}`).classList.add("d-none"),document.getElementById(`iconPause${O}`).classList.remove("d-none"),document.getElementById(`iconPause${O}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("host"),f({text:d,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Dt(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(t){let l=t.msg,d=I.findIndex(n=>n.nameServer===t.data.name);d!==-1&&(I[d].serverStatus=1),document.getElementById(`${re}`).classList.remove("d-flex"),document.getElementById(`${re}`).classList.add("d-none"),document.getElementById(`iconPlay${F}`).classList.remove("d-none"),document.getElementById(`iconPlay${F}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${t.data.id}']`).classList.add("off"),f({text:l,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Vt(e){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,l=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:t,password:l},callback:function(d){console.log(d.data),console.log(b),b.forEach((o,a)=>{d.data.id==o.id&&(b.splice(a,1),console.log(b))}),I=I.filter(o=>o.nameServer!==d.data.name);let s=d.msg;document.querySelector(`.info-box[data-server-id='${d.data.id}']`).remove(),f({text:s,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}function Ge(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("data-id"),l=document.getElementById("nameServer"+t).innerHTML;localStorage.setItem("nameServer",l),document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Je(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="/etc/bbdh",document.getElementById("addPathRunConfigServer").value="/usr/bin"})}async function Rt(){const e=document.querySelector("#cardContainer");let t=document.querySelector('input[name="nameAddNameServer"]').value,l=document.querySelector('input[name="nameAddIpServer"]').value,d=document.querySelector('input[name="nameAddPathConfigServer"]').value,n=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await y({method:"post",url:"create-server",data:{name:t,ip:l,path_config:d,path_run_config:n},callback:function(a){oe.push(a.data.id),se.push(a.data.id),I.push({numberOfServers:I.length,nameServer:a.data.name}),b.push(a.data);const i=document.createElement("div");i.className="info-box host col-3 ms-5",i.setAttribute("data-server-id",`${a.data.id}`),i.innerHTML=`
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
  `,e.appendChild(i),Je(),Ge(),f({text:a.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),Oe(),Ze(),We();const s=document.querySelectorAll(".Server");ze(s);const o=document.querySelectorAll(".editServer");je(o),document.getElementById("idLoading").style.display="none"}let Ie=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",T==0&&(T=1),ge(T);const e=this.dataset.id;C(e)});let we,ne=!1;async function ge(e=1){if(ne)return;ne=!0;let t=[],l;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(d){var i,c,m,g,v,E;t.push(d.data.data),Ie&&(document.getElementById("tBody2").innerHTML=""),Ie=!0;let n=Math.ceil(d.data.total/20),s;e==1,s=(e-1)*20,s++;let o=d.data.data.length;for(let u=0;u<o;u++){let r=document.createElement("tr");for(let h=1;h<=5;h++){let p=document.createElement("td");if(h==1)p.innerHTML=s++;else if(h==2){let A=document.createElement("span"),N=document.createElement("span");A.setAttribute("class","mx-2"),N.setAttribute("class","mx-2");let q=document.createElement("div");q.setAttribute("class","mt-2"),A.innerHTML=((c=(i=d.data.data[u].properties)==null?void 0:i.user)==null?void 0:c.first_name)||"-",N.innerHTML=((g=(m=d.data.data[u].properties)==null?void 0:m.user)==null?void 0:g.last_name)||"-",q.innerHTML=((E=(v=d.data.data[u].properties)==null?void 0:v.user)==null?void 0:E.auth_name)||"-",p.appendChild(A),p.appendChild(N),p.appendChild(q),q.classList.add("fontSize")}else if(h==3)p.innerHTML=d.data.data[u].event;else if(h==4){p.innerHTML=d.data.data[u].description;const A=document.createElement("div");A.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${u} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,p.appendChild(A)}else if(h==5){let A=new Date(d.data.data[u].created_at).toLocaleString();p.innerHTML=A}r.appendChild(p)}document.getElementById("tBody2").appendChild(r)}l=n,a(l,we);function a(u,r=T||1){const h=document.getElementById("pagination");if(h.innerHTML="",u!=1){const p=document.createElement("li");p.className=`page-item ${r===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',h.appendChild(p);const A=document.createElement("li");A.className=`page-item ${r===1?"disabled":""}`,A.innerHTML=`<a class="page-link" href="#" data-page="${r-1}">Previous Page</a>`,h.appendChild(A);const N=r===1?r:r-1,q=r===u?r:Math.min(r+1,u);for(let $=Math.max(1,N-1);$<=Math.min(u,q+1);$++){const Q=document.createElement("li");Q.className=`page-item ${$===r?"active":""}`,Q.innerHTML=`<a class="page-link ${$===r?"active-page":""}" href="#" data-page="${$}">${$}</a>`,h.appendChild(Q)}const K=document.createElement("li");K.className=`page-item ${r===u?"disabled":""}`,K.innerHTML=`<a class="page-link" href="#" data-page="${r+1}">Next Page</a>`,h.appendChild(K);const Y=document.createElement("li");Y.className=`page-item ${r===u?"disabled":""}`,Y.innerHTML=`<a class="page-link" href="#" data-page="${u}">Last Page</a>`,h.appendChild(Y);const pe=new URL(window.location);pe.searchParams.set("log",r||1),window.history.pushState({},"",pe)}}}}),ne=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(d=>{d.addEventListener("click",function(n){n.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=l&&(document.getElementById("idLoading").style.display="flex",we=s,ge(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(d=>{d.addEventListener("click",function(){const n=this.dataset.idLog,o=t[0][n],a=document.getElementById("formLog");a.innerHTML="",o?i(o,a):a.innerHTML='<p class="highlight">No data found for the given ID.</p>';function i(m,g,v=0){const E=document.createElement("ul");E.style.marginLeft=`${v*5}px`;let u;for(const r in m)if(r!="id"&&r!="subject_type"&&r!="subject_id"&&r!="causer_type"&&r!="causer_id"&&r!="batch_uuid"&&m.hasOwnProperty(r)){const h=m[r],p=document.createElement("li");if(r==="changes"&&p.classList.add("changes-highlight"),typeof h=="object"&&h!==null)p.innerHTML=`<strong>${r}:</strong>`,E.appendChild(p),i(h,p,v+1);else if(typeof h=="string"&&c(h)){p.innerHTML=`<strong>${r}:</strong>`,E.appendChild(p);const A=JSON.parse(h);i(A,p,v+1)}else r=="updated_at"||r=="created_at"?u=new Date(h).toLocaleString():u=h,p.innerHTML=`<strong>${r}:</strong> <span class="highlight">${u}</span>`,E.appendChild(p)}g.appendChild(E)}function c(m){try{JSON.parse(m)}catch{return!1}return!0}})})}let w=[],ae=!1,D,P,Se=1,x=[];async function Ke(){document.getElementById("idLoading").style.display="flex",!ae&&(ae=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),Se=1,document.getElementById("tBody3").innerHTML="";let t=e.module.length;for(let l=0;l<t;l++){x.push(e.module[l].module_id),P=l+1,w.push({serverIDs:e.module[l].server_ids,moduleID:e.module[l].module_id,moduleType:[e.module[l].module_type]});let d=document.createElement("tr");d.setAttribute("id",`tr${l+1}`),d.setAttribute("data-id",`${e.module[l].module_id}`);for(let n=1;n<=6;n++){let s=document.createElement("td");if(s.setAttribute("class",`td${n}`),n==1)s.innerHTML=Se++;else if(n==2)s.innerHTML=e.module[l].module_name;else if(n==3){let o;o=e.module[l].server_ids;let a=document.createElement("span"),i=JSON.stringify(o).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");a.innerHTML=i,s.appendChild(a)}else if(n==4){let o=e.module[l].module_type.toUpperCase(),a=JSON.stringify(o).replace(/[\[\]"\s\\]+/g,"");s.innerHTML=a}else if(n==5){s.setAttribute("class","td5 tdEditModule");let o=`<svg
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
           </svg>`;s.insertAdjacentHTML("afterbegin",o)}d.appendChild(s)}document.getElementById("tBody3").appendChild(d)}}}),Ye(),tt(),ae=!1,document.getElementById("idLoading").style.display="none",Re(),Ve())}document.getElementById("buttonIframe1").addEventListener("click",function(){Qe("iframe_a","url_input_a"),lt()});document.getElementById("buttonIframe2").addEventListener("click",function(){Qe("iframe_b","url_input_b"),lt()});function Ye(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){D=this.dataset.idModules;let t=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,t&&l?(document.querySelector('input[name="name_InputUserNameModule"]').value=t,document.querySelector('input[name="name_InputPasswordModule"]').value=l):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let d=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",jt(d),zt()})})}function Qe(e,t){const l=document.getElementById(t),d=document.getElementsByName(e)[0];l&&d&&(d.src=l.value)}function zt(){let e;for(let n=0;n<w.length;n++)w[n].moduleID==he&&(e=w[n].moduleType);const t=e.map(n=>n.toLowerCase()),l=document.getElementById("moduleTypeEPC"),d=document.getElementById("moduleType5GC");t.includes("epc")?l.checked=!0:l.checked=!1,t.includes("5gc")?d.checked=!0:d.checked=!1,t.includes("5gc")==!1&&t.includes("epc")==!1&&(d.checked=!0,l.checked=!0)}let he,V=[];function jt(e){let t=w[e-1].serverIDs,l=t.length;he=w[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let d=I.length;for(let n=1;n<=d;n++){let s=b[n-1].id,o=document.createElement("div");o.setAttribute("class","form-check");let a=document.createElement("input");a.setAttribute("class","form-check-input editModalCheckbox"),a.setAttribute("data-server-id",`${s}`),a.setAttribute("value",""),a.setAttribute("type","checkbox"),a.setAttribute("id",`selectServer${s}`);let i=document.createElement("label");i.setAttribute("class","form-check-label"),i.setAttribute("for",`selectServer${s}`),i.innerHTML=`${I[n-1].nameServer}`,o.appendChild(a),o.appendChild(i),document.getElementById("ServerEditModule").appendChild(o)}V=[];for(let n=0;n<l;n++)V.push(t[n]),document.getElementById(`selectServer${t[n]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ft(he)});async function Ft(e){let t=document.querySelector('input[name="name_nameInputEditModule"]').value,d=document.getElementById("moduleFile").files[0],n,s=document.getElementById("moduleType5GC"),o=document.getElementById("moduleTypeEPC");s.checked?n="5gc":o.checked&&(n="Epc");let a=document.querySelector('input[name="name_InputUserNameModule"]').value,i=document.querySelector('input[name="name_InputPasswordModule"]').value,c=[];document.querySelectorAll(".editModalCheckbox").forEach(v=>{v.checked&&c.push(Number(v.getAttribute("data-server-id")))});let m=new FormData;m.append("module_id",e),m.append("name",t),d&&m.append("config_file",d),m.append("type",n),c.forEach(v=>{m.append("server_ids[]",v)}),m.append("username",a),m.append("password",i);let g=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(v){let E=v.module.module_server.length,u=v.module.module_server;for(let r=0;r<w.length;r++)if(w[r].moduleID==e){w[r].serverIDs.length=0;for(let h=0;h<u.length;h++)w[r].serverIDs.push(u[h])}for(let r=0;r<w.length;r++)w[r].moduleType.length=0,w[r].moduleID==e&&w[r].moduleType.push(v.module.module_type);V=[];for(let r=0;r<E;r++)V.push(v.module.module_server[r]),document.getElementById(`selectServer${u[r]}`).checked=!0;if(V.length===0)document.querySelector(`#tr${D} .td3`).innerHTML="";else{g.checked&&(localStorage.setItem("userNameServer",a),localStorage.setItem("passwordServer",i)),document.querySelector(`#tr${D} .td2`).innerHTML=v.module.module_name;let r=v.module.module_server,h=JSON.stringify(r).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${D} .td3`).innerHTML=h,document.querySelector(`#tr${D} .td4`).innerHTML=v.module.module_type.toUpperCase()}f({text:v.message,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Xe,et;function tt(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let t=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=t,et=`#tr${e.id}`,Xe=w[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){Ot()});async function Ot(){await y({url:"delete-module",method:"delete",data:{module_id:Xe},callback:function(e){let t=x.filter(l=>l!=e.module.id);console.log(t),x=t,document.querySelector(`${et}`).remove();for(let l=1;l<=x.length;l++){let d=x[l-1];document.querySelector(`[data-id="${d}"] .td1`).innerHTML=l}f({text:e.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),t=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&t?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=t):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(b),console.log(I),document.getElementById("ServerAddModule").innerHTML="",Zt();for(let l=0;l<I.length;l++)if(I[l].serverStatus==1){for(let d=0;d<I.length;d++)if(b[l].name==I[d].nameServer){console.log(b[l].id);let n=b[l].id;console.log(n),console.log(document.getElementById(`selectServer${n}`)),document.getElementById(`selectServer${n}`).disabled=!0}}});function Zt(){let e=I.length;for(let t=1;t<=e;t++){let l=b[t-1].id,d=document.createElement("div");d.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input addModalCheckbox"),n.setAttribute("data-server-id",`${l}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${l}`);let s=document.createElement("label");s.setAttribute("class","form-check-label"),s.setAttribute("for",`selectServer${l}`),s.innerHTML=`${I[t-1].nameServer}`,d.appendChild(n),d.appendChild(s),document.getElementById("ServerAddModule").appendChild(d)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,t=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",t));let d=document.getElementById("moduleAddName").value,n=document.getElementById("moduleAddFile").value,s=document.querySelectorAll('input[name="flexRadioDefault"]'),o=document.querySelectorAll(".addModalCheckbox"),a=document.getElementById("userNameAddModule").value,i=document.getElementById("passwordAddModule").value;const c=[...s].some(g=>g.checked),m=[...o].some(g=>g.checked);d.length<3?f({text:"The module name is less than 3 characters."}).showToast():n==""?f({text:"No file has been selected."}).showToast():c==!1?f({text:"Select the desired module type."}).showToast():m==!1?f({text:"Select the desired server for the module."}).showToast():a.length<3?f({text:"The username is less than 3 characters."}).showToast():i.length<1&&f({text:"The password does not match the repeat field."}).showToast(),d.length>=3&&n!=""&&c!=!1&&m!=!1&&a.length>=3&&i.length>=1&&Wt()});async function Wt(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,l=document.getElementById("moduleAddFile").files[0],d,n=document.getElementById("moduleAddType5GC"),s=document.getElementById("moduleAddTypeEPC");n.checked&&s.checked?d="Epc, 5gc":n.checked?d="5gc":s.checked&&(d="Epc");let o=document.querySelector('input[name="name_InputUserNameAddModule"]').value,a=document.querySelector('input[name="name_InputPasswordAddModule"]').value,i=[];document.querySelectorAll(".addModalCheckbox").forEach(g=>{g.checked&&i.push(Number(g.getAttribute("data-server-id")))});let c=new FormData;c.append("name",e),l&&c.append("config_file",l),c.append("type",d);let m=0;i.forEach(g=>{c.append(`server_id[${m}]`,g),m++}),c.append("username",o),c.append("password",a),await y({url:"create-module",method:"post",data:c,headers:{"Content-Type":"multipart/form-data"},callback:function(g){let v=[];console.log(g.data),console.log(g.data.created_modules[0].module.module_id),x.push(g.data.created_modules[0].module.module_id);for(let u=0;u<g.data.created_modules.length;u++)v.push(g.data.created_modules[u].server.server_id);let E=document.createElement("tr");E.setAttribute("id",`tr${++P}`),E.setAttribute("data-id",`${g.data.created_modules[0].module.module_id}`),w.push({serverIDs:v,moduleID:g.data.created_modules[0].module.module_id,moduleType:[g.data.created_modules[0].module.module_type]});for(let u=1;u<=6;u++){let r=document.createElement("td");if(r.setAttribute("class",`td${u}`),u==1)console.log(x),r.innerHTML=x.length;else if(u==2)r.innerHTML=document.getElementById("moduleAddName").value;else if(u==3){let h=[];for(let p=0;p<g.data.created_modules.length;p++)h.push(g.data.created_modules[p].server.server_id);r.innerHTML=h.join(", ")}else if(u==4){let h=[];for(let p=0;p<1;p++)h.push(g.data.created_modules[p].module.module_type.toUpperCase());r.innerHTML=h.join(", ")}else if(u==5){r.setAttribute("class","td5 tdEditModule");let h=`<svg
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
        </svg>`;r.insertAdjacentHTML("afterbegin",h)}else if(u==6){r.setAttribute("class","td5 tdRemoveModule");let h=`<svg 
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
         </svg>`;r.insertAdjacentHTML("afterbegin",h)}E.appendChild(r)}document.getElementById("tBody3").appendChild(E),Ye(),tt(),f({text:g.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none",Re(),Ve()}async function dt(){await y({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function lt(){let e=document.getElementById("url_input_a").value,t=document.getElementById("url_input_b").value;await y({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:t},callback:function(l){console.log(l)}}),document.getElementById("idLoading").style.display="none"}function nt(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const Le=document.getElementById("IframeZobbix"),G=Le.contentDocument||Le.contentWindow.document;G.open();G.write(`
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
`);J.close();const st=J.querySelector(".imgMonitoringELK");st.style.width="100%";st.style.height="550px";const ve=e=>{const t=window.location.href;t.endsWith(".html")||t.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function ce(){return window.location.hash||De||Ne(L[0])}const Gt=()=>{let e=ce();document.querySelector(e)&&(ot(e),ve(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ve(t.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){ve(ce()),ot(ce())})});let Be=!0;function ot(e){let l=new URL(window.location).searchParams.get("log");if(T=Number(l),document.querySelectorAll(".tab-pane").forEach(d=>{d.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(d=>{d.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),Be){switch(e){case"#v-servers-home":C(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":z(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":k=[],z(2),Ue(),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",dt(),C(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":C(4),T==0&&(T=1),ge(T),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":C(5),x=[],Ke(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}Be=!1}}
