import{T as w,u as f}from"./useApi-C-cnyhs2.js";import{s as O}from"./auth-CIdfLHBs.js";function z(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function F(){for(let e=1;e<=4;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}document.querySelector("#v-servers-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;U(e)});document.querySelector("#v-userManagement").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;U(e)});document.querySelector("#V-monitoring").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;U(e)});function U(e){F(),z(),D(),document.querySelector(".menus"+e).classList.add("activeMenu")}function D(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}document.querySelector("#v-access-levels-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;$(e)});document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){const e=this.dataset.id;$(e)});function $(e){F(),z(),D(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex"}let x=!1,W=document.getElementById("showPasswordAddUser");W.addEventListener("click",function(){Z()});function Z(){x?(document.getElementById("passwordAddUser").type="password",document.getElementById("repeatPasswordAddUser").type="password",x=!1):(document.getElementById("passwordAddUser").type="text",document.getElementById("repeatPasswordAddUser").type="text",x=!0)}let T=!1,G=document.getElementById("showPasswordEditUser");G.addEventListener("click",function(){K()});function K(){T?(document.getElementById("passwordEditUser").type="password",document.getElementById("repeatPasswordEditUser").type="password",T=!1):(document.getElementById("passwordEditUser").type="text",document.getElementById("repeatPasswordEditUser").type="text",T=!0)}let H=!1,Q=document.getElementById("showPasswordShowConfig");Q.addEventListener("click",function(){X()});function X(){H?(document.getElementById("passwordShowConfig").type="password",H=!1):(document.getElementById("passwordShowConfig").type="text",H=!0)}let Y=document.getElementById("addUserModal");Y.addEventListener("click",function(){k()});let ee=document.getElementById("addTableUsers");ee.addEventListener("click",function(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,a=document.getElementById("authNameInputAddUser").value,n=document.getElementById("passwordAddUser").value,l=document.getElementById("repeatPasswordAddUser").value;e.length<3?w({text:"نام کمتر از 3 کاراکتر می باشد."}).showToast():t.length<3?w({text:"نام خانوادگی کمتر از 3 کاراکتر می باشد."}).showToast():a.length<3?w({text:"نام کاربری کمتر از 3 کاراکتر می باشد."}).showToast():n.length<8?w({text:"رمز عبور کمتر از 8 کاراکتر می باشد."}).showToast():n!=l&&w({text:"رمز عبور با فیلد تکرار مطابقت ندارد."}).showToast(),e.length>=3&&t.length>=3&&a.length>=3&&n.length>=8&&l.length>=8&&n===l&&(ae(),document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)")});let te=document.getElementById("canselAddTableUser");te.addEventListener("click",function(){k()});function k(){document.getElementById("nameInputAddUser").value="",document.getElementById("familyInputAddUser").value="",document.getElementById("authNameInputAddUser").value="",document.getElementById("passwordAddUser").value="",document.getElementById("repeatPasswordAddUser").value=""}async function ae(){let e=document.getElementById("nameInputAddUser").value,t=document.getElementById("familyInputAddUser").value,a=document.getElementById("authNameInputAddUser").value,n=document.getElementById("selectAddUser").value,l=document.getElementById("passwordAddUser").value,i=document.getElementById("repeatPasswordAddUser").value;await f({method:"post",url:"add-member",data:{first_name:e,last_name:t,auth_name:a,role:n,password:l,password_confirmation:i},callback:function(d){let r=document.createElement("tr");r.setAttribute("id",`tr${d.data.user.id}`),v.push({id:d.data.user.id,name:d.data.user.first_name,family:d.data.user.last_name,authName:d.data.user.auth_name,role:d.data.role});for(let s=1;s<=6;s++){let o=document.createElement("td");if(o.setAttribute("class",`td${s}`),s==1)o.innerHTML=document.getElementById("nameInputAddUser").value;else if(s==2)o.innerHTML=document.getElementById("familyInputAddUser").value;else if(s==3)o.innerHTML=document.getElementById("authNameInputAddUser").value;else if(s==4){let c=document.createElement("span");c.innerHTML=document.getElementById("selectAddUser").value,o.appendChild(c),d.data.role=="expert"?c.setAttribute("class","badge text-bg-primary fs-5"):d.data.role=="visitor"&&c.setAttribute("class","badge text-bg-success fs-5")}else if(s==5){let c=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${d.data.user.id}"
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          class="bi bi-pencil-square iconEditUser"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}else if(s==6){let c=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${d.data.user.id}"
          class="bi bi-trash3 removeUser" 
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;o.insertAdjacentHTML("afterbegin",c)}r.appendChild(o)}document.getElementById("tBody").appendChild(r),k(),V(),R()}}),document.getElementById("idLoading").style.display="none"}let ne=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=ne;let de=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=de;window.onload=function(){me()};let N=!0;document.querySelector("#v-users-tab").addEventListener("shown.bs.tab",function(){if(N){le(),N=!1;const e=this.dataset.id;$(e),document.getElementById("idLoading").style.display="flex"}});let v=[],j;async function le(){await f({url:"show-all-users?paginate=30",callback:function(t){document.getElementById("idLoading").style.display="none";let a=t.data.data.length;for(let n=0;n<a;n++){let l=document.createElement("tr");l.setAttribute("id",`tr${t.data.data[n].id}`),v.push({id:t.data.data[n].id,name:t.data.data[n].first_name,family:t.data.data[n].last_name,authName:t.data.data[n].auth_name,role:t.data.data[n].roles[0].name});for(let i=1;i<=6;i++){let d=document.createElement("td");if(d.setAttribute("class",`td${i}`),i==1)d.innerHTML=t.data.data[n].first_name;else if(i==2)d.innerHTML=t.data.data[n].last_name;else if(i==3)d.innerHTML=t.data.data[n].auth_name;else if(i==4){let r=document.createElement("span");r.innerHTML=t.data.data[n].roles[0].name,d.appendChild(r),t.data.data[n].roles[0].name=="admin"?r.setAttribute("class","badge text-bg-danger fs-5"):t.data.data[n].roles[0].name=="expert"?r.setAttribute("class","badge text-bg-primary fs-5"):t.data.data[n].roles[0].name=="visitor"&&r.setAttribute("class","badge text-bg-success fs-5")}else if(i==5){let r=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${t.data.data[n].id}"
          data-bs-toggle="modal"
          data-bs-target="#editUserModal"
          class="bi bi-pencil-square iconEditUser"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>`;d.insertAdjacentHTML("afterbegin",r)}else if(i==6){let r=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          id="${t.data.data[n].id}"
          fill="currentColor"
          class="bi bi-trash3 removeUser"
          data-bs-toggle="modal"
          data-bs-target="#removeUserModal"
          viewBox="0 0 16 16"
        >
          <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>`;d.insertAdjacentHTML("afterbegin",r)}l.appendChild(d)}document.getElementById("tBody").appendChild(l)}e(t)}});function e(t){let a=t.data.data.length,n=t.data.data;for(let l=0;l<a;l++)n[l].id}V(),R()}function R(){document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){let a=document.querySelector(`#usersTable tbody tr#tr${t.id} .td3`);document.getElementById("spanRemoveUser").innerHTML=a.innerHTML,j=t.id})})}let se=document.getElementById("removeUserModalClick");se.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",re(j)});let q;function V(){let e=document.querySelectorAll(".iconEditUser");document.getElementById("passwordEditUser").value="",e.forEach(t=>{t.addEventListener("click",function(){q=t;let a=v.find(n=>n.id==t.id);a!=-1&&(document.querySelector('input[name="name_nameInputEditUser"]').value=a.name,document.querySelector('input[name="nameFamilyInputEditUser"]').value=a.family,document.querySelector('input[name="nameAuthNameInputEditUser"]').value=a.authName,document.getElementById("selectEditUser").value=a.role)})})}let ie=document.getElementById("addEditUser");ie.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",oe(q.id)});async function re(e){await f({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove(),document.getElementById("idLoading").style.display="none"}})}async function oe(e){let t=Number(e),a=document.getElementById("nameInputEditUser").value,n=document.getElementById("familyInputEditUser").value,l=document.getElementById("authNameInputEditUser").value,i=document.getElementById("selectEditUser").value,d=document.getElementById("passwordEditUser").value,r=document.getElementById("repeatPasswordEditUser").value;await f({method:"put",url:"reset-password-and-auth-name",data:{first_name:a,last_name:n,user_id:t,auth_name:l,role:i,password:d,password_confirmation:r},callback:function(s){document.getElementById("idLoading").style.display="none";let o=v.findIndex(L=>L.id==q.id);o!=-1&&(v[o].id=s.data.user.id,v[o].name=s.data.user.first_name,v[o].family=s.data.user.last_name,v[o].authName=s.data.user.auth_name,v[o].role=s.data.user.roles),document.querySelector(`#tr${e} .td1`).innerHTML=s.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=s.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=s.data.user.auth_name,document.querySelector(`#tr${e} .td4 span`).innerHTML=s.data.user.roles;let c=document.querySelector(`#tr${s.data.user.id} .td4 span`);c.innerHTML=="expert"?(c.classList.remove("text-bg-success"),c.classList.add("text-bg-primary")):c.innerHTML=="visitor"&&(c.classList.remove("text-bg-primary"),c.classList.add("text-bg-success")),w({text:"مشخصات کاربر با موفقیت بروزرسانی شد."}).showToast()},errorCallback:function(){document.getElementById("idLoading").style.display="none"}})}let b,B;function ce(e,t,a){const l=new Date().getTime()+a*24*60*60*1e3,i={value:t,expiry:l};localStorage.setItem(e,JSON.stringify(i))}function ue(e){const t=localStorage.getItem(e);if(!t)return null;const a=JSON.parse(t);return new Date().getTime()>a.expiry?(localStorage.removeItem(e),null):a.value}async function me(){document.getElementById("idLoading").style.display="flex",await f({url:"get-me",callback:function(i){O(i.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await f({url:"show-all-servers",callback:function(i){b=i.data,ye(b),document.getElementById("idLoading").style.display="none"}});const e=document.querySelectorAll(".Server"),t=document.getElementById("subShowConfigModule");let a;e.forEach(i=>{i.addEventListener("click",function(){a=this.dataset.id})}),t.addEventListener("click",function(){document.getElementById("idLoading").style.display="flex",n(a)});async function n(i){let d=document.querySelector('input[name="nameUserNameShowConfig"]').value,r=document.querySelector('input[name="namePasswordShowConfig"]').value;console.log(i),localStorage.setItem("server",i),await f({method:"post",data:{username:d,password:r},url:"show-config-module/12",callback:function(){ce("userData",{username:d,password:r},3);const s=ue("userData");console.log(s),document.getElementById("idLoading").style.display="none",location.href="../views/settingServer.html"}})}document.querySelectorAll(".editServer").forEach(i=>{i.addEventListener("click",function(){B=this.dataset.id;let d=b[B-1].name,r=b[B-1].ip;document.querySelector('input[name="nameEditNameServer"]').value=d,document.querySelector('input[name="nameEditIpServer"]').value=r})})}async function ge(e){let t=document.getElementById("editNameServer").value,a=document.getElementById("editIpServer").value;document.getElementById("idLoading").style.display="flex",document.getElementById("idLoading").style.background="hsla(0, 0%, 100%, 0.5)",await f({method:"put",url:"edit-server",data:{server_id:e,name:t,ip:a},callback:function(){let n=document.querySelector('input[name="nameEditNameServer"]').value,l=document.querySelector('input[name="nameEditIpServer"]').value;document.getElementById("nameServer"+e).innerHTML=n,document.getElementById("ipServer"+e).innerHTML=l,b[e-1].name=n,document.getElementById("idLoading").style.display="none"}})}let pe=document.getElementById("subServer");pe.addEventListener("click",function(){ge(B)});function ye(e){const t=document.querySelector("#cardContainer");e.forEach(a=>{const n=document.createElement("div");n.className="info-box host col-3 me-5",n.innerHTML=`
  <h5 id="nameServer${a.id}">${a.name}</h5>
  <p id="ipServer${a.id}">${a.ip}</p>
  <div
  class="div-pencil d-flex justify-content-center align-items-center editServer"
  data-id="${a.id}"
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
      id="iconPause${a.id}"
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
      id="iconPlay${a.id}"
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
  </div>
  <div>
    <div
      class="divFlex d-flex justify-content-center align-items-center Server ms-2"
      data-bs-toggle="modal"
      data-bs-target="#serverPassword"
      data-id="${a.id}"
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
  `,t.appendChild(n),document.querySelectorAll(".divIconPause").forEach(d=>{d.addEventListener("click",function(){let r=d.id,s=r.charAt(r.length-1);document.getElementById(`${d.id}`).classList.remove("d-flex"),document.getElementById(`${d.id}`).classList.add("d-none"),document.getElementById(`iconPlay${s}`).classList.remove("d-none"),document.getElementById(`iconPlay${s}`).classList.add("d-flex")})}),document.querySelectorAll(".divIconPlay").forEach(d=>{d.addEventListener("click",function(){let r=d.id,s=r.charAt(r.length-1);document.getElementById(`${d.id}`).classList.remove("d-flex"),document.getElementById(`${d.id}`).classList.add("d-none"),document.getElementById(`iconPause${s}`).classList.remove("d-none"),document.getElementById(`iconPause${s}`).classList.add("d-flex")})})})}let _=!0;document.querySelector("#v-log").addEventListener("shown.bs.tab",function(){document.getElementById("idLoading").style.display="flex",_&&(J(1),_=!1);const e=this.dataset.id;U(e)});let P;async function J(e=1){let t;await f({method:"post",url:`show-all-logs?sort=-id&paginate=20&page=${e}`,callback:function(a){var r,s,o,c,L,C;let n=Math.ceil(a.data.total/20),l;e==1,l=(e-1)*20,l++;let i=a.data.data.length;for(let m=0;m<i;m++){let u=document.createElement("tr");for(let g=1;g<=5;g++){let p=document.createElement("td");if(g==1)p.innerHTML=l++;else if(g==2){let y=document.createElement("span"),I=document.createElement("span");y.setAttribute("class","mx-2"),I.setAttribute("class","mx-2");let h=document.createElement("div");h.setAttribute("class","mt-2"),y.innerHTML=((s=(r=a.data.data[m].properties)==null?void 0:r.user)==null?void 0:s.first_name)||"-",I.innerHTML=((c=(o=a.data.data[m].properties)==null?void 0:o.user)==null?void 0:c.last_name)||"-",h.innerHTML=((C=(L=a.data.data[m].properties)==null?void 0:L.user)==null?void 0:C.auth_name)||"-",p.appendChild(y),p.appendChild(I),p.appendChild(h),h.classList.add("fontSize")}else if(g==3)p.innerHTML=a.data.data[m].event;else if(g==4)p.innerHTML=a.data.data[m].description;else if(g==5){let y=new Date(a.data.data[m].created_at).toLocaleString("fa-IR");p.innerHTML=y}u.appendChild(p)}document.getElementById("tBody2").appendChild(u)}t=n,d(t,P);function d(m,u=1){const g=document.getElementById("pagination");g.innerHTML="";const p=document.createElement("li");p.className=`page-item ${u===1?"disabled":""}`,p.innerHTML='<a class="page-link" href="#" data-page="1">اولین صفحه</a>',g.appendChild(p);const y=document.createElement("li");y.className=`page-item ${u===1?"disabled":""}`,y.innerHTML=`<a class="page-link" href="#" data-page="${u-1}">صفحه قبلی</a>`,g.appendChild(y);const I=u===1?u:u-1,h=u===m?u:Math.min(u+1,m);for(let E=Math.max(1,I-1);E<=Math.min(m,h+1);E++){const M=document.createElement("li");M.className=`page-item ${E===u?"active":""}`,M.innerHTML=`<a class="page-link ${E===u?"active-page":""}" href="#" data-page="${E}">${E}</a>`,g.appendChild(M)}const S=document.createElement("li");S.className=`page-item ${u===m?"disabled":""}`,S.innerHTML=`<a class="page-link" href="#" data-page="${u+1}">صفحه بعدی</a>`,g.appendChild(S);const A=document.createElement("li");A.className=`page-item ${u===m?"disabled":""}`,A.innerHTML=`<a class="page-link" href="#" data-page="${m}">آخرین صفحه</a>`,g.appendChild(A)}document.getElementById("idLoading").style.display="none"}}),pagination.querySelectorAll(".page-link").forEach(a=>{a.addEventListener("click",function(n){n.preventDefault();const l=parseInt(this.getAttribute("data-page"));!isNaN(l)&&l>0&&l<=t&&(document.getElementById("idLoading").style.display="flex",P=l,J(l),document.querySelector(".pagination").innerHTML="",document.getElementById("tBody2").innerHTML="")})})}const ve=e=>{window.location.hash=e};document.querySelectorAll("button.styleButton").forEach(e=>{e.addEventListener("shown.bs.tab",t=>{ve(t.target.id)})});
