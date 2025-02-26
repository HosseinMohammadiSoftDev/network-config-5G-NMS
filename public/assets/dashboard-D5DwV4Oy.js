import{T as f,u as y}from"./useApi-Mgb1BH1A.js";import{s as ct}from"./auth-CIdfLHBs.js";function z(e){for(let l=1;l<=e;l++)document.querySelector(".subMenu"+l).classList.remove("clickSubMenu")}let M=[1,2,3,4,5];function Ue(){for(let e=1;e<=M.length;e++)document.querySelector(".menus"+M[e-1]).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;C(e)});document.querySelector("#V-monitoring-tab").addEventListener("shown.bs.tab",function(){document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("idLoading").style.display="flex";const e=this.dataset.id;C(e),nt(),requestAnimationFrame(()=>{document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active")})});document.querySelector("#v-module-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;C(e),T=[],Qe()});function C(e){st(),Ue(),z(),_e(),document.querySelector(".menus"+e).classList.add("activeMenu")}function _e(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;V(e)});function V(e){st(),Ue(),z(),_e(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let ee=!1,ut=document.getElementById("showPasswordAddUser");ut.addEventListener("click",function(){mt()});function mt(){ee?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",ee=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",ee=!0)}let te=!1,gt=document.getElementById("showPasswordEditUser");gt.addEventListener("click",function(){ht()});function ht(){te?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",te=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",te=!0)}let de=!1,vt=document.getElementById("showPasswordShowConfig");vt.addEventListener("click",function(){pt()});function pt(){de?(document.getElementById("passwordShowConfig").type="password",de=!1):(document.getElementById("passwordShowConfig").type="text",de=!0)}let le=!1,ft=document.getElementById("showPasswordDeletServer");ft.addEventListener("click",function(){yt()});function yt(){le?(document.getElementById("passwordDeletServer").type="password",le=!1):(document.getElementById("passwordDeletServer").type="text",le=!0)}async function qe(){await y({url:"show-all-permission",callback:function(e){console.log(e),document.getElementById("showAccessLevel").innerHTML="",document.getElementById("divAccessLevelEdit").innerHTML="";for(let l=1;l<e.data.length;l++){let d=document.createElement("div");d.setAttribute("class","form-check");let t=document.createElement("input");t.setAttribute("class","form-check-input accessLevelCheckbox"),t.setAttribute("type","checkbox"),t.setAttribute("id",`selectAccessLevel${l+1}`),t.setAttribute("data-id",e.data[l]),t.setAttribute("required","required");let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectAccessLevel${l+1}`),a.innerHTML=`${e.data[l]}`,d.appendChild(a),d.appendChild(t),document.getElementById("showAccessLevel").appendChild(d)}for(let l=1;l<e.data.length;l++){let d=document.createElement("div");d.setAttribute("class","form-check");let t=document.createElement("input");t.setAttribute("class","form-check-input accessLevelCheckboxEdit"),t.setAttribute("type","checkbox"),t.setAttribute("id",`selectAccessLevelEdit${l+1}`),t.setAttribute("data-id",e.data[l]),t.setAttribute("required","required");let a=document.createElement("label");a.setAttribute("class","form-check-label"),a.setAttribute("for",`selectAccessLevelEdit${l+1}`),a.innerHTML=`${e.data[l]}`,d.appendChild(a),d.appendChild(t),document.getElementById("divAccessLevelEdit").appendChild(d)}}}),$e()}qe();let W,F,U=[],re=[],A;async function $e(){document.getElementById("idLoadingPermission").style.display="flex",document.getElementById("showAccessLevel").style.display="none",document.getElementById("divPasswordAddUser").classList.add("margin_top"),await y({url:"show-all-roles",callback:function(d){d.data[0],W=d.data[1],F=d.data[2],A=document.querySelectorAll('input[type="checkbox"][data-id]'),U=[],A.forEach(t=>{U.push(t.getAttribute("data-id"))}),A.forEach(t=>{F.permissions.some(s=>s===t.getAttribute("data-id"))&&(t.checked=!0),t.disabled=!1})}}),document.getElementById("idLoadingPermission").style.display="none",document.getElementById("showAccessLevel").style.display="block",document.getElementById("divPasswordAddUser").classList.remove("margin_top");let e=[];re=[],document.querySelectorAll(".accessLevelCheckbox").forEach(d=>{e.push(d.id),re.push(d.id)}),A.forEach(d=>{d.addEventListener("change",()=>{let t=document.getElementById("selectAccessLevel5"),a=document.getElementById("selectAccessLevel6"),s=document.getElementById("selectAccessLevel7"),i=document.getElementById("selectAccessLevel8");(a.checked||s.checked||i.checked)&&(t.checked=!0);for(let n=13;n<=e.length+1;n++)document.getElementById("selectAccessLevel"+n).checked&&(t.checked=!0)})});let l=[];document.querySelectorAll(".accessLevelCheckboxEdit").forEach(d=>{l.push(d.id)}),A.forEach(d=>{d.addEventListener("change",()=>{let t=document.getElementById("selectAccessLevelEdit5"),a=document.getElementById("selectAccessLevelEdit6"),s=document.getElementById("selectAccessLevelEdit7"),i=document.getElementById("selectAccessLevelEdit8");(a.checked||s.checked||i.checked)&&(t.checked=!0);for(let n=13;n<=e.length+1;n++)document.getElementById("selectAccessLevelEdit"+n).checked&&(t.checked=!0)})})}function Et(){A.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(W.permissions.forEach(e=>{U.includes(e)&&A.forEach(l=>{l.getAttribute("data-id")===e&&(l.checked=!0)})}),A.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&F.permissions.forEach(e=>{U.includes(e)&&A.forEach(l=>{l.getAttribute("data-id")===e&&(l.checked=!0,l.disabled=!1)})})}function bt(){A.forEach(e=>{e.checked=!1,e.disabled=!1}),this.value==="visitor"?(W.permissions.forEach(e=>{U.includes(e)&&A.forEach(l=>{l.getAttribute("data-id")===e&&(l.checked=!0)})}),A.forEach(e=>{e.checked||(e.disabled=!0)})):this.value==="expert"&&F.permissions.forEach(e=>{U.includes(e)&&A.forEach(l=>{l.getAttribute("data-id")===e&&(l.checked=!0,l.disabled=!1)})})}function It(e){A.forEach(l=>{l.disabled=!0}),e==="visitor"?W.permissions.forEach(l=>{U.includes(l)&&A.forEach(d=>{d.getAttribute("data-id")===l&&(d.disabled=!1)})}):A.forEach(l=>{l.disabled=!1})}document.getElementById("selectAddUser").addEventListener("change",Et);document.getElementById("selectEditUser").addEventListener("change",bt);let wt=document.getElementById("addUserModal");wt.addEventListener("click",function(){document.getElementById("selectAddUser").value="expert",_=[],G=0,document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){e.checked=!1}),pe(),$e()});let _=[];function St(){document.querySelectorAll(".accessLevelCheckbox").forEach(function(e){if(e.checked){let l=document.querySelector(`label[for='${e.id}']`);_.push(l.innerHTML)}})}function Lt(){document.querySelectorAll(".accessLevelCheckboxEdit").forEach(function(e){if(e.checked){console.log(e),console.log(_);let l=document.querySelector(`label[for='${e.id}']`);_.push(l.innerHTML)}})}let At=document.getElementById("addTableUsers");At.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,l=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,t=document.querySelectorAll(".accessLevelCheckbox"),a=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value;const i=[...t].some(n=>n.checked);if(e.length<3?f({text:"The name is less than 3 characters."}).showToast():l.length<3?f({text:"The last name is less than 3 characters."}).showToast():d.length<3?f({text:"The username is less than 3 characters."}).showToast():i==!1?f({text:"You must select one of the following permissions."}).showToast():a.length<8?f({text:"The password is less than 8 characters."}).showToast():a!=s&&f({text:"The password does not match the repeat field."}).showToast(),e.length>=3&&l.length>=3&&d.length>=3&&i!=!1&&a.length>=8&&s.length>=8&&a===s)if(document.getElementById("selectAddUser").value=="visitor"){const n=document.getElementById("selectAccessLevel5");if(n&&n.checked){let o=!0;for(let r=2;r<=re.length+1;r++){if(r===5||r>=13)continue;const m=document.getElementById("selectAccessLevel"+r);if(m&&m.checked){o=!1;break}}o?(Se(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)"):f({text:"This permissions is not related to this role."}).showToast()}}else Se(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)"});let Bt=document.getElementById("canselAddTableUser");Bt.addEventListener("click",function(){pe()});function pe(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}const Mt=document.querySelectorAll(".accessLevelAdd");Mt.forEach(function(e){e.addEventListener("click",function(){const l=document.querySelector(`label[for="${this.dataset.id}"]`);l&&l.textContent})});let G=0;async function Se(){let e=document.getElementById("nameInputAddUser").value,l=document.getElementById("familyInputAddUser").value,d=document.getElementById("authNameInputAddUser").value,t=document.getElementById("selectAddUser").value,a=document.getElementById("passwordAddUser").value,s=document.getElementById("repeatPasswordAddUser").value,i=new FormData;i.append("first_name",e),i.append("last_name",l),i.append("auth_name",d),i.append("role",t),i.append("password",a),i.append("password_confirmation",s),console.log("AddUser"),St(),_.forEach(n=>{i.append(`permission_name[${G++}]`,n)}),await y({method:"post",url:"add-member",data:i,headers:{"Content-Type":"multipart/form-data"},callback:function(n){x.push(n.data.user);let o=document.createElement("tr");o.setAttribute("id",`tr${n.data.user.id}`),o.setAttribute("data-id",`${n.data.user.id}`),k.push({id:n.data.user.id,name:n.data.user.first_name,family:n.data.user.last_name,authName:n.data.user.auth_name,permission:n.data.permission_name,role:n.data.role});for(let r=1;r<=8;r++){let m=document.createElement("td");if(m.setAttribute("class",`td${r}`),r==1)console.log(x.length),m.innerHTML=x.length;else if(r==2)m.innerHTML=document.getElementById("nameInputAddUser").value;else if(r==3)m.innerHTML=document.getElementById("familyInputAddUser").value;else if(r==4)m.innerHTML=document.getElementById("authNameInputAddUser").value;else if(r==5){let u=document.createElement("span");u.innerHTML=document.getElementById("selectAddUser").value,m.appendChild(u),n.data.role=="expert"?u.setAttribute("class","badge text-bg-primary fs-5"):n.data.role=="visitor"&&u.setAttribute("class","badge text-bg-success fs-5")}else if(r==6){let u=`
            <button type="button" class="btn btn-secondary iconAccessLevel"  
             data-bs-toggle="modal"
             data-bs-target="#modalAccessLevel"
             id="${n.data.user.id}"
             data-id="permission_${n.data.user.id}"
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
            `;m.insertAdjacentHTML("afterbegin",u)}else if(r==7){let u=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${n.data.user.id}"
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
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}else if(r==8){let u=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${n.data.user.id}"
          class="bi bi-trash3 removeUser cursorPointer" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}o.appendChild(m)}document.getElementById("tBody").appendChild(o),pe(),Ne(),Pe(),f({text:n.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let kt=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=kt;let xt=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=xt;window.onload=function(){qt()};let Le=!1;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){x=[],qe(),S==0&&(S=1),fe(S);const e=this.dataset.id;V(e),document.getElementById("idLoading").style.display="flex"});let k=[],He,ne=!1,Ae=1,x=[];async function fe(e=1){if(ne)return;ne=!0;let l;await y({url:"show-all-users?paginate=20",callback:function(t){Ae=1,k=[],Le&&(document.getElementById("tBody").innerHTML=""),Le=!0,console.log(t.data.user);let a=Math.ceil(t.data.user.length/20),s=t.data.user.length;for(let n=0;n<s;n++){x.push(t.data.user[n]);let o=document.createElement("tr");o.setAttribute("id",`tr${t.data.user[n].id}`),o.setAttribute("data-id",`${t.data.user[n].id}`),k.push({id:t.data.user[n].id,name:t.data.user[n].first_name,family:t.data.user[n].last_name,authName:t.data.user[n].auth_name,permission:t.data.user[n].permissions,role:t.data.user[n].roles[0]});for(let r=1;r<=8;r++){let m=document.createElement("td");if(m.setAttribute("class",`td${r}`),r==1)m.innerHTML=Ae++;else if(r==2)m.innerHTML=t.data.user[n].first_name;else if(r==3)m.innerHTML=t.data.user[n].last_name;else if(r==4)m.innerHTML=t.data.user[n].auth_name;else if(r==5){let u=document.createElement("span");u.innerHTML=t.data.user[n].roles[0],m.appendChild(u),t.data.user[n].roles[0]=="admin"?u.setAttribute("class","badge text-bg-danger fs-5"):t.data.user[n].roles[0]=="expert"?u.setAttribute("class","badge text-bg-primary fs-5"):t.data.user[n].roles[0]=="visitor"&&u.setAttribute("class","badge text-bg-success fs-5")}else if(r==6){let u=`
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
            `;m.insertAdjacentHTML("afterbegin",u)}else if(r==7){let u=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}else if(r==8)if(n!=0){let u=`<svg
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
        </svg>`;m.insertAdjacentHTML("afterbegin",u)}else{let u=document.createElement("p");u.innerHTML="____",m.appendChild(u)}o.appendChild(m)}document.getElementById("tBody").appendChild(o)}d(t),l=a,i(l,Z);function i(n,o=S||1){const r=document.getElementById("paginationUser");if(r.innerHTML="",n!=1){const m=document.createElement("li");m.className=`page-item ${o===1?"disabled":""}`,m.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',r.appendChild(m);const u=document.createElement("li");u.className=`page-item ${o===1?"disabled":""}`,u.innerHTML=`<a class="page-link" href="#" data-page="${o-1}">Previous Page</a>`,r.appendChild(u);const p=o===1?o:o-1,w=o===n?o:Math.min(o+1,n);for(let v=Math.max(1,p-1);v<=Math.min(n,w+1);v++){const b=document.createElement("li");b.className=`page-item ${v===o?"active":""}`,b.innerHTML=`<a class="page-link ${v===o?"active-page":""}" href="#" data-page="${v}">${v}</a>`,r.appendChild(b)}const g=document.createElement("li");g.className=`page-item ${o===n?"disabled":""}`,g.innerHTML=`<a class="page-link" href="#" data-page="${o+1}">Next Page</a>`,r.appendChild(g);const c=document.createElement("li");c.className=`page-item ${o===n?"disabled":""}`,c.innerHTML=`<a class="page-link" href="#" data-page="${n}">Last Page</a>`,r.appendChild(c);const h=new URL(window.location);h.searchParams.set("user",o||1),window.history.pushState({},"",h)}}}}),ne=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(t=>{t.addEventListener("click",function(a){a.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=l&&(document.getElementById("idLoading").style.display="flex",Z=s,fe(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody").innerHTML="")})});function d(t){let a=t.data.user.length,s=t.data.user;for(let i=0;i<a;i++)s[i].id}Ne(),Pe()}function Pe(){document.querySelectorAll(".removeUser").forEach(l=>{l.addEventListener("click",function(){let d=document.querySelector(`#usersTable tbody tr#tr${l.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=d.innerHTML,He=l.id})})}let Tt=document.getElementById("removeUserModalClick");Tt.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",Ut(He)});let ye;function Ne(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",document.querySelectorAll(".iconAccessLevel").forEach(l=>{l.addEventListener("click",function(){_=[],document.getElementById("divShowPermission").innerHTML="";const d=k.find(t=>t.id==this.id);for(let t=0;t<d.permission.length;t++){let a=d.permission[t],s=document.createElement("p");s.innerHTML=a,document.getElementById("divShowPermission").appendChild(s)}})}),e.forEach(l=>{l.addEventListener("click",function(){l.id==1?(document.getElementById("roleEditUser").style.display="none",document.getElementById("divEditUsers").style.display="none"):(document.getElementById("roleEditUser").style.display="block",document.getElementById("divEditUsers").style.display="block"),document.getElementById("divShowPermission").innerHTML="";let d=[];d=k.find(a=>a.id==this.id);for(let a=0;a<d.permission.length;a++)document.querySelectorAll("#divEditUsers input").forEach(s=>{s.checked=!1});for(let a=0;a<d.permission.length;a++){let s=d.permission[a];document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckbox").forEach(i=>{let n=document.querySelector(`label[for='${i.id}']`);if(s===n.innerHTML){let o=document.createElement("p");o.innerHTML=s,document.getElementById("divShowPermission").appendChild(o),i.checked=!0}}),document.querySelectorAll("#divAccessLevelEdit .form-check .accessLevelCheckboxEdit").forEach(i=>{let n=document.querySelector(`label[for='${i.id}']`);if(s===n.innerHTML){let o=document.createElement("p");o.innerHTML=s,document.getElementById("divShowPermission").appendChild(o),i.checked=!0}})}ye=l;let t=k.find(a=>a.id==l.id);t!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=t.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=t.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=t.authName,document.getElementById("selectEditUser").value=t.role,It(t.role))})})}let Ct=document.getElementById("addEditUser");Ct.addEventListener("click",function(){G=0,document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",_t(ye.id)});async function Ut(e){await y({method:"delete",url:`delete-member-Account/${e}`,callback:function(l){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),x=x.filter(a=>a.id!=l.data.id);for(let a=1;a<=x.length;a++){let s=x[a-1].id;document.querySelector(`[data-id="${s}"] .td1`).innerHTML=a}f({text:l.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function _t(e){let l=Number(e),d=document.getElementById("nameInputEditUser").value,t=document.getElementById("familyInputEditUser").value,a=document.getElementById("authNameInputEditUser").value,s=document.getElementById("selectEditUser").value,i=document.getElementById("passwordEditUser").value,n=document.getElementById("repeatPasswordEditUser").value,o=new FormData;o.append("user_id",l),o.append("first_name",d),o.append("last_name",t),o.append("auth_name",a),o.append("role",s),o.append("password",i),o.append("password_confirmation",n),Lt(),_.forEach(r=>{o.append(`permission_name[${G++}]`,r)}),await y({method:"post",url:"edit_member",data:o,headers:{"Content-Type":"multipart/form-data"},callback:function(r){k.forEach(p=>{p.id==r.data.user.id&&(p.name=r.data.user.name,p.family=r.data.user.family,p.authName=r.data.user.authName,p.role=r.data.user.role,p.permission=r.data.user.permissions)});let m=k.findIndex(p=>p.id==ye.id);m!=-1&&(k[m].id=r.data.user.id,k[m].name=r.data.user.first_name,k[m].family=r.data.user.last_name,k[m].authName=r.data.user.auth_name,k[m].role=r.data.user.roles),document.querySelector(`#tr${e} .td2`).innerHTML=r.data.user.first_name,document.querySelector(`#tr${e} .td3`).innerHTML=r.data.user.last_name,document.querySelector(`#tr${e} .td4`).innerHTML=r.data.user.auth_name,document.querySelector(`#tr${e} .td5 span`).innerHTML=r.data.user.roles;let u=document.querySelector(`#tr${r.data.user.id} .td5 span`);u.innerHTML=="expert"?(u.classList.remove("text-bg-success"),u.classList.add("text-bg-primary")):u.innerHTML=="visitor"&&(u.classList.remove("text-bg-primary"),u.classList.add("text-bg-success")),f({text:r.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let E,De,I=[],B,ie=!1,ce=!1;function Re(e){if(e.startsWith("VM"))return"#v-servers-home";if(e.startsWith("module"))return"#v-module";if(e.startsWith("log"))return"#v-log";if(e.startsWith("monitoring"))return"#v-monitoring";if(e.startsWith("user"))return"#v-users"}let ze="",ae,ue,me=[];async function qt(){await y({url:"get-me",callback:function(d){ue=d.data.user.permissionServerIds,ae=d.data.user.roles[0],B=d.data.user.permissions,ct(d.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await y({url:"show-all-servers",callback:function(d){E=d.data;for(let t=0;t<d.data.length;t++)me.push(d.data[t].id),I.push({numberOfServers:d.data.length,nameServer:d.data[t].name,serverStatus:d.data[t].is_down});Nt(E)}}),document.getElementById("idLoading").style.display="none",Jt();const e=document.querySelectorAll(".Server");je(e);const l=document.querySelectorAll(".editServer");Oe(l),ze=Re(B[0]),B.includes("user")?z(2):(document.getElementById("v-users-tab").remove(),document.getElementById("class-access-level").classList.remove("mb-3"),z(1)),ae=="visitor"&&(document.getElementById("iconAddServer").remove(),document.querySelectorAll(".editServer").forEach(d=>{d.remove()}),document.querySelectorAll(".divIconRemoveServer").forEach(d=>{d.remove()}),document.getElementById("addModal").remove(),ie=!0,document.getElementById("thEditModule").remove(),ce=!0,document.getElementById("thRemoveModule").remove(),document.querySelectorAll(".divIconPause").forEach(d=>{d.remove()}),document.querySelectorAll(".divIconPlay").forEach(d=>{d.remove()}),document.getElementById("v-log-tab").remove(),M=M.filter(d=>d!=4),document.getElementById("V-monitoring-tab").remove(),M=M.filter(d=>d!=3)),B.includes("VM/read")||(document.getElementById("v-servers-tab").remove(),M=M.filter(d=>d!=1)),B.includes("VM/create")||document.getElementById("iconAddServer").remove(),B.includes("VM/update")||document.querySelectorAll(".editServer").forEach(d=>{d.remove()}),B.includes("VM/delete")||document.querySelectorAll(".divIconRemoveServer").forEach(d=>{d.remove()}),B.includes("module/read")||(document.getElementById("v-module-tab").remove(),M=M.filter(d=>d!=5)),B.includes("module/create")||document.getElementById("addModal").remove(),B.includes("module/update")||(ie=!0,document.getElementById("thEditModule").remove()),B.includes("module/delete")||(ce=!0,document.getElementById("thRemoveModule").remove()),B.includes("VM/status")||(document.querySelectorAll(".divIconPause").forEach(d=>{d.remove()}),document.querySelectorAll(".divIconPlay").forEach(d=>{d.remove()})),B.includes("log")||(document.getElementById("v-log-tab").remove(),M=M.filter(d=>d!=4)),B.includes("monitoring")||(document.getElementById("V-monitoring-tab").remove(),M=M.filter(d=>d!=3)),ae!="admin"&&me.filter(t=>!ue.includes(t)).forEach(t=>{document.querySelector(`.info-box[data-server-id='${t}']`).remove()})}function Ve(){ie&&(document.querySelectorAll(".editModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdEditModule").forEach(e=>{e.remove()}))}function Fe(){ce&&(document.querySelectorAll(".deleteModuleClick").forEach(e=>{e.remove()}),document.querySelectorAll(".tdRemoveModule").forEach(e=>{e.remove()}))}function je(e){const l=document.getElementById("subShowConfigModule");let d;e.forEach(t=>{t.addEventListener("click",function(){d=this.dataset.id})}),l.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",$t(d)})}let S;function Oe(e){e.forEach(l=>{l.addEventListener("click",function(){let d=E.find(n=>n.id==this.dataset.id);De=this.dataset.id;let t=d.name,a=d.ip,s=d.path_config,i=d.path_run_config;document.querySelector('input[name="nameEditNameServer"]').value=t,document.querySelector('input[name="nameEditIpServer"]').value=a,document.querySelector('input[name="nameEditPathConfigServer"]').value=s,document.querySelector('input[name="nameEditPathRunConfigServer"]').value=i})})}async function $t(e){let l=document.querySelector('input[name="nameUserNameShowConfig"]').value,d=document.querySelector('input[name="namePasswordShowConfig"]').value;localStorage.setItem("server",e),await y({method:"post",url:"test-connection",data:{server_id:e,username:l,password:d},callback:function(){localStorage.setItem("userNameServer",l),localStorage.setItem("passwordServer",d),location.href="../views/settingServer.html"}}),document.getElementById("idLoading").style.display="none"}async function Ht(e){let l=document.getElementById("editNameServer").value,d=document.getElementById("editIpServer").value,t=document.getElementById("editPathConfigServer").value,a=document.getElementById("editPathRunConfigServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await y({method:"put",url:"edit-server",data:{server_id:e,name:l,ip:d,path_config:t,path_run_config:a},callback:function(s){let i=0,n=s.data.name,o=s.data.ip;document.getElementById("nameServer"+e).innerHTML=n,document.getElementById("ipServer"+e).innerHTML=o,E.find(m=>(i++,m.id==e))&&(E[i-1].name=n,E[i-1].ip=o,E[i-1].path_config=s.data.path_config,E[i-1].path_run_config=s.data.path_run_config),f({text:s.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let Pt=document.getElementById("subServer");Pt.addEventListener("click",function(){Ht(De)});let j,O,Ze,ge,he,H,Be;function Nt(e){let l=0;const d=document.querySelector("#cardContainer");e.forEach(t=>{H=document.createElement("div"),e[l].is_down==0?H.className="info-box host col-3 ms-5":H.className="info-box off col-3 ms-5",H.setAttribute("data-server-id",`${e[l].id}`),l++,H.innerHTML=`
  <h5 id="nameServer${t.id}">${t.name}</h5>
  <p id="ipServer${t.id}">${t.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${t.id}"
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
      style="${e[l-1].is_down==1?"display:none":"display:flex"}"
      data-server-pause-id="${t.id}"
      id="iconPause${t.id}"
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
      style="${e[l-1].is_down==0?"display:none":"display:flex"}"
      data-server-play-id="${t.id}"
      id="iconPlay${t.id}"
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
      data-server-trash-id="${t.id}"
      id="iconRemoveServer${t.id}"
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
      data-id="${t.id}"
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
  `,d.appendChild(H)}),We(),document.getElementById("playClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Dt(O)}),Ge(),document.getElementById("pauseClick").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Rt(j)}),Je(),document.getElementById("subDeletServer").addEventListener("click",function(){let t=document.querySelector('input[name="nameUserNameDeletServer"]').value,a=document.querySelector('input[name="namePasswordDeletServer"]').value;t.length<3?f({text:"The name is less than 3 characters."}).showToast():a.length<8&&f({text:"The password is less than 8 characters."}).showToast(),t.length>=3&&a.length>=8&&(zt(Ze),document.getElementById("idLoading").style.display="flex")}),Ke(),Ye(),document.getElementById("subAddServer").addEventListener("click",function(){let t=document.querySelector('input[name="nameAddNameServer"]').value,a=document.querySelector('input[name="nameAddIpServer"]').value;t.length<3?f({text:"The name is less than 3 characters."}).showToast():a.length<7&&f({text:"The IP is less than 7 characters."}).showToast(),t.length>=3&&a.length>=7&&(Vt(),document.getElementById("idLoading").style.display="flex")})}function We(){Be=document.querySelectorAll(".divIconPause"),Be.forEach(e=>{e.addEventListener("click",function(){ge=e.id,j=this.dataset.serverPauseId;let l=document.getElementById("nameServer"+this.dataset.serverPauseId).innerHTML;document.getElementById("spanPauseServer").innerHTML=l})})}function Ge(){document.querySelectorAll(".divIconPlay").forEach(l=>{l.addEventListener("click",function(){he=l.id,O=this.dataset.serverPlayId;let d=document.getElementById("nameServer"+this.dataset.serverPlayId).innerHTML;document.getElementById("spanPlayServer").innerHTML=d})})}function Je(){document.querySelectorAll(".divIconRemoveServer").forEach(l=>{l.addEventListener("click",function(){Ze=this.dataset.serverTrashId;let d=document.getElementById("nameServer"+this.dataset.serverTrashId).innerHTML;document.getElementById("userNameDeletServer").value="",document.getElementById("passwordDeletServer").value="",document.getElementById("spanTrashServer").innerHTML=`\`${d}\``})})}async function Dt(e){await y({method:"post",url:"server-start",data:{server_id:e},callback:function(l){let d=I.findIndex(a=>a.nameServer===l.data.name);d!==-1&&(I[d].serverStatus=0);let t=l.msg;document.getElementById(`${he}`).classList.remove("d-flex"),document.getElementById(`${he}`).classList.add("d-none"),document.getElementById(`iconPause${O}`).classList.remove("d-none"),document.getElementById(`iconPause${O}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${l.data.id}']`).classList.remove("off"),document.querySelector(`.info-box[data-server-id='${l.data.id}']`).classList.add("host"),f({text:t,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function Rt(e){await y({method:"post",url:"server-stop",data:{server_id:e},callback:function(l){let d=l.msg,t=I.findIndex(a=>a.nameServer===l.data.name);t!==-1&&(I[t].serverStatus=1),document.getElementById(`${ge}`).classList.remove("d-flex"),document.getElementById(`${ge}`).classList.add("d-none"),document.getElementById(`iconPlay${j}`).classList.remove("d-none"),document.getElementById(`iconPlay${j}`).classList.add("d-flex"),document.querySelector(`.info-box[data-server-id='${l.data.id}']`).classList.remove("host"),document.querySelector(`.info-box[data-server-id='${l.data.id}']`).classList.add("off"),f({text:d,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}async function zt(e){let l=document.querySelector('input[name="nameUserNameDeletServer"]').value,d=document.querySelector('input[name="namePasswordDeletServer"]').value;await y({method:"delete",url:"server-delete",data:{server_id:e,auth_name:l,password:d},callback:function(t){console.log(t.data),console.log(E),E.forEach((i,n)=>{t.data.id==i.id&&(E.splice(n,1),console.log(E))}),I=I.filter(i=>i.nameServer!==t.data.name);let s=t.msg;document.querySelector(`.info-box[data-server-id='${t.data.id}']`).remove(),f({text:s,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}function Ke(){document.querySelectorAll(".gearConfig").forEach(e=>{e.addEventListener("click",function(){let l=e.getAttribute("data-id"),d=document.getElementById("nameServer"+l).innerHTML;localStorage.setItem("nameServer",d),document.getElementById("userNameShowConfig").value="",document.getElementById("passwordShowConfig").value=""})})}function Ye(){document.getElementById("iconAddServer").addEventListener("click",function(){document.getElementById("addNameServer").value="",document.getElementById("addIpServer").value="",document.getElementById("addPathConfigServer").value="/etc/bbdh",document.getElementById("addPathRunConfigServer").value="/usr/bin"})}async function Vt(){const e=document.querySelector("#cardContainer");let l=document.querySelector('input[name="nameAddNameServer"]').value,d=document.querySelector('input[name="nameAddIpServer"]').value,t=document.querySelector('input[name="nameAddPathConfigServer"]').value,a=document.querySelector('input[name="nameAddPathRunConfigServer"]').value;await y({method:"post",url:"create-server",data:{name:l,ip:d,path_config:t,path_run_config:a},callback:function(n){me.push(n.data.id),ue.push(n.data.id),I.push({numberOfServers:I.length,nameServer:n.data.name}),E.push(n.data);const o=document.createElement("div");o.className="info-box host col-3 ms-5",o.setAttribute("data-server-id",`${n.data.id}`),o.innerHTML=`
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
  `,e.appendChild(o),Ye(),Ke(),f({text:n.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),We(),Ge(),Je();const s=document.querySelectorAll(".Server");je(s);const i=document.querySelectorAll(".editServer");Oe(i),document.getElementById("idLoading").style.display="none"}let Me=!1;document.querySelector("#v-log-tab").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",S==0&&(S=1),Ee(S);const e=this.dataset.id;C(e)});let Z,se=!1;async function Ee(e=1){if(se)return;se=!0;let l=[],d;await y({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(t){var o,r,m,u,p,w;l.push(t.data.data),Me&&(document.getElementById("tBody2").innerHTML=""),Me=!0;let a=Math.ceil(t.data.total/20);console.log(t.data);let s;s=(e-1)*20,s++;let i=t.data.data.length;for(let g=0;g<i;g++){let c=document.createElement("tr");for(let h=1;h<=5;h++){let v=document.createElement("td");if(h==1)v.innerHTML=s++;else if(h==2){let b=document.createElement("span"),N=document.createElement("span");b.setAttribute("class","mx-2"),N.setAttribute("class","mx-2");let q=document.createElement("div");q.setAttribute("class","mt-2"),b.innerHTML=((r=(o=t.data.data[g].properties)==null?void 0:o.user)==null?void 0:r.first_name)||"-",N.innerHTML=((u=(m=t.data.data[g].properties)==null?void 0:m.user)==null?void 0:u.last_name)||"-",q.innerHTML=((w=(p=t.data.data[g].properties)==null?void 0:p.user)==null?void 0:w.auth_name)||"-",v.appendChild(b),v.appendChild(N),v.appendChild(q),q.classList.add("fontSize")}else if(h==3)v.innerHTML=t.data.data[g].event;else if(h==4){v.innerHTML=t.data.data[g].description;const b=document.createElement("div");b.innerHTML=`
            <div class="btn btn-secondary btnLog py-1 px-2 mt-2" data-id-log=${g} data-bs-toggle="modal"  data-bs-target="#modalMoreDetailsLog">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" 
               >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
            </div>
               `,v.appendChild(b)}else if(h==5){let b=new Date(t.data.data[g].created_at).toLocaleString();v.innerHTML=b}c.appendChild(v)}document.getElementById("tBody2").appendChild(c)}d=a,n(d,Z);function n(g,c=S||1){const h=document.getElementById("pagination");if(h.innerHTML="",g!=1){const v=document.createElement("li");v.className=`page-item ${c===1?"disabled":""}`,v.innerHTML='<a class="page-link" href="#" data-page="1">First Page</a>',h.appendChild(v);const b=document.createElement("li");b.className=`page-item ${c===1?"disabled":""}`,b.innerHTML=`<a class="page-link" href="#" data-page="${c-1}">Previous Page</a>`,h.appendChild(b);const N=c===1?c:c-1,q=c===g?c:Math.min(c+1,g);for(let $=Math.max(1,N-1);$<=Math.min(g,q+1);$++){const X=document.createElement("li");X.className=`page-item ${$===c?"active":""}`,X.innerHTML=`<a class="page-link ${$===c?"active-page":""}" href="#" data-page="${$}">${$}</a>`,h.appendChild(X)}const Y=document.createElement("li");Y.className=`page-item ${c===g?"disabled":""}`,Y.innerHTML=`<a class="page-link" href="#" data-page="${c+1}">Next Page</a>`,h.appendChild(Y);const Q=document.createElement("li");Q.className=`page-item ${c===g?"disabled":""}`,Q.innerHTML=`<a class="page-link" href="#" data-page="${g}">Last Page</a>`,h.appendChild(Q);const we=new URL(window.location);we.searchParams.set("log",c||1),window.history.pushState({},"",we)}}}}),se=!1,document.getElementById("idLoading").style.display="none",pagination.querySelectorAll(".page-link").forEach(t=>{t.addEventListener("click",function(a){a.preventDefault();const s=parseInt(this.getAttribute("data-page"));!isNaN(s)&&s>0&&s<=d&&(document.getElementById("idLoading").style.display="flex",Z=s,Ee(s),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})}),document.querySelectorAll(".btnLog").forEach(t=>{t.addEventListener("click",function(){const a=this.dataset.idLog,i=l[0][a],n=document.getElementById("formLog");n.innerHTML="",i?o(i,n):n.innerHTML='<p class="highlight">No data found for the given ID.</p>';function o(m,u,p=0){const w=document.createElement("ul");w.style.marginLeft=`${p*5}px`;let g;for(const c in m)if(c!="id"&&c!="subject_type"&&c!="subject_id"&&c!="causer_type"&&c!="causer_id"&&c!="batch_uuid"&&m.hasOwnProperty(c)){const h=m[c],v=document.createElement("li");if(c==="changes"&&v.classList.add("changes-highlight"),typeof h=="object"&&h!==null)v.innerHTML=`<strong>${c}:</strong>`,w.appendChild(v),o(h,v,p+1);else if(typeof h=="string"&&r(h)){v.innerHTML=`<strong>${c}:</strong>`,w.appendChild(v);const b=JSON.parse(h);o(b,v,p+1)}else c=="updated_at"||c=="created_at"?g=new Date(h).toLocaleString():g=h,v.innerHTML=`<strong>${c}:</strong> <span class="highlight">${g}</span>`,w.appendChild(v)}u.appendChild(w)}function r(m){try{JSON.parse(m)}catch{return!1}return!0}})})}let L=[],oe=!1,D,P,ke=1,T=[];async function Qe(){document.getElementById("idLoading").style.display="flex",!oe&&(oe=!0,await y({url:"show-all-modules",callback:function(e){console.log(e),ke=1,document.getElementById("tBody3").innerHTML="";let l=e.module.length;for(let d=0;d<l;d++){T.push(e.module[d].module_id),P=d+1,L.push({serverIDs:e.module[d].server_ids,moduleID:e.module[d].module_id,moduleType:[e.module[d].module_type]});let t=document.createElement("tr");t.setAttribute("id",`tr${d+1}`),t.setAttribute("data-id",`${e.module[d].module_id}`);for(let a=1;a<=6;a++){let s=document.createElement("td");if(s.setAttribute("class",`td${a}`),a==1)s.innerHTML=ke++;else if(a==2)s.innerHTML=e.module[d].module_name;else if(a==3){let i;i=e.module[d].server_ids;let n=document.createElement("span"),o=JSON.stringify(i).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");n.innerHTML=o,s.appendChild(n)}else if(a==4){let i=e.module[d].module_type.toUpperCase(),n=JSON.stringify(i).replace(/[\[\]"\s\\]+/g,"");s.innerHTML=n}else if(a==5){s.setAttribute("class","td5 tdEditModule");let i=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${d+1}"
          data-id-modules = "${d+1}"
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
        </svg>`;s.insertAdjacentHTML("afterbegin",i)}else if(a==6){s.setAttribute("class","td6 tdRemoveModule");let i=`<svg 
            xmlns="http://www.w3.org/2000/svg"
           width="26" 
           height="26" 
           id="${d+1}"
           data-id-modules = "${d+1}"
           data-bs-toggle="modal"
           data-bs-target="#removeModule"
           fill="currentColor" 
           class="bi bi-trash3 deleteModuleClick cursorPointer"
           viewBox="0 0 16 16">
           <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
           </svg>`;s.insertAdjacentHTML("afterbegin",i)}t.appendChild(s)}document.getElementById("tBody3").appendChild(t)}}}),Xe(),lt(),oe=!1,document.getElementById("idLoading").style.display="none",Fe(),Ve())}document.getElementById("buttonIframe1").addEventListener("click",function(){et("iframe_a","url_input_a"),at()});document.getElementById("buttonIframe2").addEventListener("click",function(){et("iframe_b","url_input_b"),at()});function Xe(){document.querySelectorAll(".editModuleClick").forEach(e=>{e.addEventListener("click",function(){D=this.dataset.idModules;let l=localStorage.getItem("userNameServer"),d=localStorage.getItem("passwordServer");document.getElementById("saveValue").checked=!1,l&&d?(document.querySelector('input[name="name_InputUserNameModule"]').value=l,document.querySelector('input[name="name_InputPasswordModule"]').value=d):(document.querySelector('input[name="name_InputUserNameModule"]').value="",document.querySelector('input[name="name_InputPasswordModule"]').value=""),document.querySelector("#moduleFile").value="";let t=this.dataset.idModules;document.getElementById("ServerEditModule").innerHTML="",jt(t),Ft()})})}function et(e,l){const d=document.getElementById(l),t=document.getElementsByName(e)[0];d&&t&&(t.src=d.value)}function Ft(){let e;for(let a=0;a<L.length;a++)L[a].moduleID==be&&(e=L[a].moduleType);const l=e.map(a=>a.toLowerCase()),d=document.getElementById("moduleTypeEPC"),t=document.getElementById("moduleType5GC");l.includes("epc")?d.checked=!0:d.checked=!1,l.includes("5gc")?t.checked=!0:t.checked=!1,l.includes("5gc")==!1&&l.includes("epc")==!1&&(t.checked=!0,d.checked=!0)}let be,R=[];function jt(e){let l=L[e-1].serverIDs,d=l.length;be=L[e-1].moduleID,document.querySelector('input[name="name_nameInputEditModule"]').value=document.querySelector(`#tr${e} .td2`).innerHTML;let t=I.length;for(let a=1;a<=t;a++){let s=E[a-1].id,i=document.createElement("div");i.setAttribute("class","form-check");let n=document.createElement("input");n.setAttribute("class","form-check-input editModalCheckbox"),n.setAttribute("data-server-id",`${s}`),n.setAttribute("value",""),n.setAttribute("type","checkbox"),n.setAttribute("id",`selectServer${s}`);let o=document.createElement("label");o.setAttribute("class","form-check-label"),o.setAttribute("for",`selectServer${s}`),o.innerHTML=`${I[a-1].nameServer}`,i.appendChild(n),i.appendChild(o),document.getElementById("ServerEditModule").appendChild(i)}R=[];for(let a=0;a<d;a++)R.push(l[a]),document.getElementById(`selectServer${l[a]}`).checked=!0}document.getElementById("buttonUpdateModule").addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",Ot(be)});async function Ot(e){let l=document.querySelector('input[name="name_nameInputEditModule"]').value,t=document.getElementById("moduleFile").files[0],a,s=document.getElementById("moduleType5GC"),i=document.getElementById("moduleTypeEPC");s.checked?a="5gc":i.checked&&(a="Epc");let n=document.querySelector('input[name="name_InputUserNameModule"]').value,o=document.querySelector('input[name="name_InputPasswordModule"]').value,r=[];document.querySelectorAll(".editModalCheckbox").forEach(p=>{p.checked&&r.push(Number(p.getAttribute("data-server-id")))});let m=new FormData;m.append("module_id",e),m.append("name",l),t&&m.append("config_file",t),m.append("type",a),r.forEach(p=>{m.append("server_ids[]",p)}),m.append("username",n),m.append("password",o);let u=document.getElementById("saveValue");await y({url:"edit-module",method:"post",data:m,headers:{"Content-Type":"multipart/form-data"},callback:function(p){let w=p.module.module_server.length,g=p.module.module_server;for(let c=0;c<L.length;c++)if(L[c].moduleID==e){L[c].serverIDs.length=0;for(let h=0;h<g.length;h++)L[c].serverIDs.push(g[h])}for(let c=0;c<L.length;c++)L[c].moduleType.length=0,L[c].moduleID==e&&L[c].moduleType.push(p.module.module_type);R=[];for(let c=0;c<w;c++)R.push(p.module.module_server[c]),document.getElementById(`selectServer${g[c]}`).checked=!0;if(R.length===0)document.querySelector(`#tr${D} .td3`).innerHTML="";else{u.checked&&(localStorage.setItem("userNameServer",n),localStorage.setItem("passwordServer",o)),document.querySelector(`#tr${D} .td2`).innerHTML=p.module.module_name;let c=p.module.module_server,h=JSON.stringify(c).replace(/,\s*\]$/,"").replace(/^\[/,"").replace(/\]$/,"").replace(/,/g,", ");document.querySelector(`#tr${D} .td3`).innerHTML=h,document.querySelector(`#tr${D} .td4`).innerHTML=p.module.module_type.toUpperCase()}f({text:p.message,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}let tt,dt;function lt(){document.querySelectorAll(".deleteModuleClick").forEach(function(e){e.addEventListener("click",function(){let l=document.querySelector(`#tr${e.id} .td2`).innerHTML;document.getElementById("spanRemoveModule").innerHTML=l,dt=`#tr${e.id}`,tt=L[e.id-1].moduleID})})}document.getElementById("subDeletModule").addEventListener("click",function(){Zt()});async function Zt(){await y({url:"delete-module",method:"delete",data:{module_id:tt},callback:function(e){let l=T.filter(d=>d!=e.module.id);console.log(l),T=l,document.querySelector(`${dt}`).remove();for(let d=1;d<=T.length;d++){let t=T[d-1];document.querySelector(`[data-id="${t}"] .td1`).innerHTML=d}f({text:e.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none"}document.getElementById("addModal").addEventListener("click",function(){let e=localStorage.getItem("userNameServer"),l=localStorage.getItem("passwordServer");document.querySelector('input[name="name_nameInputAddModule"]').value="",document.querySelector("#moduleAddFile").value="",document.querySelector("#moduleAddTypeEPC").checked=!1,document.querySelector("#moduleAddType5GC").checked=!1,document.querySelector("#saveValueAdd").checked=!1,e&&l?(document.querySelector('input[name="name_InputUserNameAddModule"]').value=e,document.querySelector('input[name="name_InputPasswordAddModule"]').value=l):(document.querySelector('input[name="name_InputUserNameAddModule"]').value="",document.querySelector('input[name="name_InputPasswordAddModule"]').value=""),console.log(E),console.log(I),document.getElementById("ServerAddModule").innerHTML="",Wt();for(let d=0;d<I.length;d++)if(I[d].serverStatus==1){for(let t=0;t<I.length;t++)if(E[d].name==I[t].nameServer){console.log(E[d].id);let a=E[d].id;console.log(a),console.log(document.getElementById(`selectServer${a}`)),document.getElementById(`selectServer${a}`).disabled=!0}}});function Wt(){let e=I.length;for(let l=1;l<=e;l++){let d=E[l-1].id,t=document.createElement("div");t.setAttribute("class","form-check");let a=document.createElement("input");a.setAttribute("class","form-check-input addModalCheckbox"),a.setAttribute("data-server-id",`${d}`),a.setAttribute("value",""),a.setAttribute("type","checkbox"),a.setAttribute("id",`selectServer${d}`);let s=document.createElement("label");s.setAttribute("class","form-check-label"),s.setAttribute("for",`selectServer${d}`),s.innerHTML=`${I[l-1].nameServer}`,t.appendChild(a),t.appendChild(s),document.getElementById("ServerAddModule").appendChild(t)}}document.getElementById("buttonAddModule").addEventListener("click",function(){let e=document.querySelector('input[name="name_InputUserNameAddModule"]').value,l=document.querySelector('input[name="name_InputPasswordAddModule"]').value;document.getElementById("saveValueAdd").checked&&(localStorage.setItem("userNameServer",e),localStorage.setItem("passwordServer",l));let t=document.getElementById("moduleAddName").value,a=document.getElementById("moduleAddFile").value,s=document.querySelectorAll('input[name="flexRadioDefault"]'),i=document.querySelectorAll(".addModalCheckbox"),n=document.getElementById("userNameAddModule").value,o=document.getElementById("passwordAddModule").value;const r=[...s].some(u=>u.checked),m=[...i].some(u=>u.checked);t.length<3?f({text:"The module name is less than 3 characters."}).showToast():a==""?f({text:"No file has been selected."}).showToast():r==!1?f({text:"Select the desired module type."}).showToast():m==!1?f({text:"Select the desired server for the module."}).showToast():n.length<3?f({text:"The username is less than 3 characters."}).showToast():o.length<1&&f({text:"The password does not match the repeat field."}).showToast(),t.length>=3&&a!=""&&r!=!1&&m!=!1&&n.length>=3&&o.length>=1&&Gt()});async function Gt(){document.getElementById("idLoading").style.display="flex";let e=document.querySelector('input[name="name_nameInputAddModule"]').value,d=document.getElementById("moduleAddFile").files[0],t,a=document.getElementById("moduleAddType5GC"),s=document.getElementById("moduleAddTypeEPC");a.checked&&s.checked?t="Epc, 5gc":a.checked?t="5gc":s.checked&&(t="Epc");let i=document.querySelector('input[name="name_InputUserNameAddModule"]').value,n=document.querySelector('input[name="name_InputPasswordAddModule"]').value,o=[];document.querySelectorAll(".addModalCheckbox").forEach(u=>{u.checked&&o.push(Number(u.getAttribute("data-server-id")))});let r=new FormData;r.append("name",e),d&&r.append("config_file",d),r.append("type",t);let m=0;o.forEach(u=>{r.append(`server_id[${m}]`,u),m++}),r.append("username",i),r.append("password",n),await y({url:"create-module",method:"post",data:r,headers:{"Content-Type":"multipart/form-data"},callback:function(u){let p=[];console.log(u.data),console.log(u.data.created_modules[0].module.module_id),T.push(u.data.created_modules[0].module.module_id);for(let g=0;g<u.data.created_modules.length;g++)p.push(u.data.created_modules[g].server.server_id);let w=document.createElement("tr");w.setAttribute("id",`tr${++P}`),w.setAttribute("data-id",`${u.data.created_modules[0].module.module_id}`),L.push({serverIDs:p,moduleID:u.data.created_modules[0].module.module_id,moduleType:[u.data.created_modules[0].module.module_type]});for(let g=1;g<=6;g++){let c=document.createElement("td");if(c.setAttribute("class",`td${g}`),g==1)console.log(T),c.innerHTML=T.length;else if(g==2)c.innerHTML=document.getElementById("moduleAddName").value;else if(g==3){let h=[];for(let v=0;v<u.data.created_modules.length;v++)h.push(u.data.created_modules[v].server.server_id);c.innerHTML=h.join(", ")}else if(g==4){let h=[];for(let v=0;v<1;v++)h.push(u.data.created_modules[v].module.module_type.toUpperCase());c.innerHTML=h.join(", ")}else if(g==5){c.setAttribute("class","td5 tdEditModule");let h=`<svg
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
        </svg>`;c.insertAdjacentHTML("afterbegin",h)}else if(g==6){c.setAttribute("class","td5 tdRemoveModule");let h=`<svg 
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
         </svg>`;c.insertAdjacentHTML("afterbegin",h)}w.appendChild(c)}document.getElementById("tBody3").appendChild(w),Xe(),lt(),f({text:u.msg,style:{background:"linear-gradient(to right,rgb(0, 172, 14),rgb(0, 167, 14))"}}).showToast()}}),document.getElementById("idLoading").style.display="none",Fe(),Ve()}async function nt(){await y({url:"show-address",callback:function(e){console.log(e),e.length>0&&(document.getElementById("url_input_a").value=`${e[0].zabbix_address}`,document.getElementById("url_input_b").value=e[0].elk_address||"")}}),document.getElementById("idLoading").style.display="none"}async function at(){let e=document.getElementById("url_input_a").value,l=document.getElementById("url_input_b").value;await y({method:"post",url:"add-address",data:{zabbix_address:e,elk_address:l},callback:function(d){console.log(d)}}),document.getElementById("idLoading").style.display="none"}function st(){const e=new URL(window.location.href);e.searchParams.delete("log"),window.history.replaceState({},"",e)}document.querySelectorAll(".ActiveMenuScroll").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll(".subMenuClick").forEach(function(e){e.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});const xe=document.getElementById("IframeZobbix"),J=xe.contentDocument||xe.contentWindow.document;J.open();J.write(`
    <html>
        <body>
         <img class="imgMonitoring" src="../assets/img/Monitor-cuate.svg" alt="عکس نمونه">
        </body>
    </html>
`);J.close();const ot=J.querySelector(".imgMonitoring");ot.style.width="100%";ot.style.height="550px";const Te=document.getElementById("IframeELK"),K=Te.contentDocument||Te.contentWindow.document;K.open();K.write(`
    <html>
        <body>
         <img class="imgMonitoringELK" src="../assets/img/Monitor-cuate.svg" alt="عکس نمونه">
        </body>
    </html>
`);K.close();const rt=K.querySelector(".imgMonitoringELK");rt.style.width="100%";rt.style.height="550px";const Ie=e=>{const l=window.location.href;l.endsWith(".html")||l.split("/").slice(0,-1).join("/")+""+e,window.location.hash=e};function ve(){return window.location.hash||ze||Re(B[0])}const Jt=()=>{let e=ve();document.querySelector(e)&&(it(e),Ie(e))};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",l=>{Ie(l.target.dataset.bsTarget)})});document.querySelectorAll(".clickTab").forEach(e=>{e.addEventListener("click",function(){Ie(ve()),it(ve())})});let Ce=!0;function it(e){let d=new URL(window.location).searchParams.get("log");if(S=Number(d),document.querySelectorAll(".tab-pane").forEach(t=>{t.classList.remove("active","show")}),document.querySelectorAll(".clickTab").forEach(t=>{t.classList.remove("active")}),document.querySelector(`${e}`).classList.add("active","show"),Ce){switch(e){case"#v-servers-home":C(1),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-access-levels":V(1),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-users":x=[],V(2),S==0&&(S=1),fe(S),document.getElementById("v-userManagement").classList.remove("collapsed"),document.getElementById("collapseAppManagement").classList.add("show"),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-monitoring":document.getElementById("idLoading").style.display="flex",nt(),C(3),document.getElementById("Elk").classList.remove("active"),document.getElementById("zobbix").classList.add("active"),document.getElementById("tab1").classList.add("show"),document.getElementById("tab1").classList.add("active"),document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-log":C(4),S==0&&(S=1),Ee(S),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break;case"#v-module":C(5),T=[],Qe(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoadingDashbord").style.display="none";break}Ce=!1}}
