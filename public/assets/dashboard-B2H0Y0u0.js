import{u as h}from"./useApi-BXOHF4dq.js";import{s as H}from"./auth-CIdfLHBs.js";const b=document.getElementById("searchInput"),p=document.getElementById("suggestionsList");function k(){const e=b.value.toLowerCase();if(p.innerHTML="",e===""||filteredSuggestions.length===0){p.classList.add("d-none");return}filteredSuggestions.forEach(s=>{const d=document.createElement("li");d.textContent=s,d.addEventListener("click",()=>{b.value=s,p.classList.add("d-none")}),p.appendChild(d)}),p.classList.remove("d-none")}b.addEventListener("input",k);document.addEventListener("click",e=>{!b.contains(e.target)&&!p.contains(e.target)&&p.classList.add("d-none")});function B(){for(let e=1;e<=2;e++)document.querySelector(".subMenu"+e).classList.remove("clickSubMenu")}function A(){for(let e=1;e<=4;e++)document.querySelector(".menus"+e).classList.remove("activeMenu")}let i=new URL(window.location.href);const q=document.querySelectorAll(".ActiveMenuClick");q.forEach(e=>{e.addEventListener("click",function(){const s=this.dataset.id;x(s)})});function y(){i.searchParams.delete("Setting"),i.searchParams.delete("User"),i.searchParams.delete("Super"),i.searchParams.delete("Reports")}function I(){i.searchParams.delete("Access"),i.searchParams.delete("Users")}function x(e){switch(A(),B(),T(),document.querySelector(".menus"+e).classList.add("activeMenu"),e){case"1":y(),I(),i.searchParams.set("Setting","Server"),window.history.replaceState({},"",i);break;case"2":y(),i.searchParams.set("User","Management"),window.history.replaceState({},"",i);break;case"3":y(),I(),i.searchParams.set("Super","vision"),window.history.replaceState({},"",i);break;case"4":y(),I(),i.searchParams.set("Reports","reports"),window.history.replaceState({},"",i);break}}function T(){for(let e=1;e<=2;e++)document.querySelector(".iconSubMenu"+e).style.display="none"}const P=document.querySelectorAll(".subMenuClick");P.forEach(e=>{e.addEventListener("click",function(){const s=this.dataset.id;U(s)})});function U(e){switch(A(),B(),T(),document.querySelector(".menus2").classList.add("activeMenu"),document.querySelector(".subMenu"+e).classList.add("clickSubMenu"),document.querySelector(".iconSubMenu"+e).style.display="flex",e){case"1":i.searchParams.delete("Users"),i.searchParams.set("Access","levels"),window.history.replaceState({},"",i);break;case"2":i.searchParams.delete("Access"),i.searchParams.set("Users","users"),window.history.replaceState({},"",i);break}}let L=!1,C=document.querySelector(".showPassword");C.addEventListener("click",function(){_()});function _(){L?(document.getElementById("password").type="password",document.getElementById("repeatPassword").type="password",L=!1):(document.getElementById("password").type="text",document.getElementById("repeatPassword").type="text",L=!0)}let M=!1,N=document.querySelector(".showPassword2");N.addEventListener("click",function(){$()});function $(){M?(document.getElementById("passwordNew").type="password",document.getElementById("repeatPasswordNew").type="password",M=!1):(document.getElementById("passwordNew").type="text",document.getElementById("repeatPasswordNew").type="text",M=!0)}let z=document.getElementById("addTableUsers");z.addEventListener("click",function(){j()});async function j(){let e=document.getElementById("nameInput").value,s=document.getElementById("familyInput").value,d=document.getElementById("userInput").value,u=document.getElementById("select").value,r=document.getElementById("password").value,t=document.getElementById("repeatPassword").value;await h({method:"post",url:"add-member",data:{first_name:e,last_name:s,auth_name:d,role:u,password:r,password_confirmation:t},callback:function(c){console.log(c.data.user.id);let a=document.createElement("tr");a.setAttribute("id",`tr${c.data.user.id}`);for(let n=1;n<=6;n++){let l=document.createElement("td");if(n==1)l.innerHTML=document.getElementById("nameInput").value;else if(n==2)l.innerHTML=document.getElementById("familyInput").value;else if(n==3)l.innerHTML=document.getElementById("userInput").value;else if(n==4)l.innerHTML=document.getElementById("select").value;else if(n==5){let o=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${c.data.user.id}"
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
        </svg>`;l.insertAdjacentHTML("afterbegin",o)}else if(n==6){let o=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${c.data.user.id}"
          class="bi bi-trash3" 
          viewBox="0 0 16 16"
          >
           <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
             />
        </svg>`;l.insertAdjacentHTML("afterbegin",o)}a.appendChild(l)}document.getElementById("tBody").appendChild(a)}})}let F=localStorage.getItem("dataUser_name");document.getElementById("userName").innerHTML=F;let R=localStorage.getItem("dataUser_role");document.getElementById("role").innerHTML=R;window.onload=function(){J()};let V=document.getElementById("v-users-tab");V.addEventListener("click",function(){D()});let v=[];async function D(){await h({url:"show-all-users",callback:function(t){let c=t.data.data.length;for(let a=0;a<c;a++){let n=document.createElement("tr");n.setAttribute("id",`tr${t.data.data[a].id}`),v.push({id:t.data.data[a].id,name:t.data.data[a].first_name,family:t.data.data[a].last_name,authName:t.data.data[a].auth_name});for(let l=1;l<=6;l++){let o=document.createElement("td");if(o.setAttribute("class",`td${l}`),l==1)o.innerHTML=t.data.data[a].first_name;else if(l==2)o.innerHTML=t.data.data[a].last_name;else if(l==3)o.innerHTML=t.data.data[a].auth_name;else if(l==4)o.innerHTML=t.data.data[a].roles[0].name;else if(l==5){let m=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          id="${t.data.data[a].id}"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop3"
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
        </svg>`;o.insertAdjacentHTML("afterbegin",m)}else if(l==6){let m=`<svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          id="${t.data.data[a].id}"
          fill="currentColor"
          class="bi bi-trash3 removeUser"
          viewBox="0 0 16 16"
        >
          <path
             d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>`;o.insertAdjacentHTML("afterbegin",m)}n.appendChild(o)}document.getElementById("tBody").appendChild(n)}console.log(v),s(t)}}),document.querySelectorAll(".removeUser").forEach(t=>{t.addEventListener("click",function(){Z(t.id)})});function s(t){let c=t.data.data.length,a=t.data.data;console.log(a);let n=[];for(let l=0;l<c;l++)n[l]=a[l].id;console.log(n)}let d;document.querySelectorAll(".iconEditUser").forEach(t=>{t.addEventListener("click",function(){d=t;for(let c=0;c<v.length;c++)if(console.log(v),console.log(t.id==v[c].id),t.id==v[c].id){let a=c;document.querySelector('input[name="myInputName"]').value=v[a].name,document.querySelector('input[name="myInputFamily"]').value=v[a].family,document.querySelector('input[name="myInputAuthName"]').value=v[a].authName;break}})}),document.getElementById("addEditUser").addEventListener("click",function(){G(d.id)})}async function Z(e){await h({method:"delete",url:`delete-member-Account/${e}`,callback:function(){document.querySelector(`#usersTable tbody tr#tr${e}`).remove()}})}async function G(e){let s=Number(e);console.log(s),document.getElementById("nameInputNew").value,document.getElementById("familyInputNew").value;let d=document.getElementById("userInputNew").value,u=document.getElementById("passwordNew").value;document.getElementById("repeatPasswordNew").value;let r=document.querySelector(`#usersTable tbody tr#tr${e}`);console.log(r),await h({method:"put",url:"reset-password-and-auth-name",data:{user_id:s,auth_name:d,password:u},callback:function(t){console.log(t),console.log(e),document.querySelector(`#tr${e} .td1`).innerHTML=t.data.user.first_name,document.querySelector(`#tr${e} .td2`).innerHTML=t.data.user.last_name,document.querySelector(`#tr${e} .td3`).innerHTML=t.data.user.auth_name}})}let f;async function J(){await h({url:"get-me",callback:function(r){H(r.data.user.auth_name)},errorCallback:function(){window.location.href="../views/login.html"}}),await h({url:"show-all-servers",callback:function(r){f=r.data,O(f)}}),document.querySelectorAll(".Server").forEach(r=>{r.addEventListener("click",function(){const t=this.dataset.id;s(t),console.log(t)})});function s(r){console.log(r),localStorage.setItem("server",r),location.href="../views/settingServer.html"}document.querySelectorAll(".editServer").forEach(r=>{r.addEventListener("click",function(){const t=this.dataset.id;u(t)})});function u(r){document.getElementById("divEditServer").style.display="block";let t=f[r-1].name,c=f[r-1].ip;document.querySelector('input[name="myInputServer"]').value=t,document.querySelector('input[name="myInputIP"]').value=c,E=r}}let E,K=document.getElementById("subServer");K.addEventListener("click",function(){let e=document.querySelector('input[name="myInputServer"]').value,s=document.querySelector('input[name="myInputIP"]').value;document.getElementById("nameServer"+E).innerHTML=e,document.getElementById("ipServer"+E).innerHTML=s,f[E-1].name=e});function O(e){const s=document.querySelector("#cardContainer");e.forEach(d=>{const u=document.createElement("div");u.className="info-box host col-3 me-5",u.innerHTML=`
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
      class="divFlex d-flex justify-content-center align-items-center"
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
      class="divFlex d-flex justify-content-center align-items-center me-2"
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
  `,s.appendChild(u)})}let Q=document.getElementById("v-log");Q.addEventListener("click",function(){W()});async function W(){await h({url:"show-all-logs?paginate=20&sort=-id",callback:function(e){var d,u,r,t,c,a;console.log(e.data.data);let s=e.data.data.length;console.log(s);for(let n=0;n<s;n++){let l=document.createElement("tr");for(let o=1;o<=5;o++){let m=document.createElement("td");if(o==1)m.innerHTML=n+1;else if(o==2){let g=document.createElement("span"),S=document.createElement("span");g.setAttribute("class","mx-2"),S.setAttribute("class","mx-2");let w=document.createElement("div");w.setAttribute("class","mt-2"),g.innerHTML=((u=(d=e.data.data[n].properties)==null?void 0:d.user)==null?void 0:u.first_name)||"-",S.innerHTML=((t=(r=e.data.data[n].properties)==null?void 0:r.user)==null?void 0:t.last_name)||"-",w.innerHTML=((a=(c=e.data.data[n].properties)==null?void 0:c.user)==null?void 0:a.auth_name)||"-",m.appendChild(g),m.appendChild(S),m.appendChild(w),w.classList.add("fontSize")}else if(o==3)m.innerHTML=e.data.data[n].event;else if(o==4)m.innerHTML=e.data.data[n].description;else if(o==5){let g=new Date(e.data.data[n].created_at).toLocaleString("fa-IR");m.innerHTML=g}l.appendChild(m)}document.getElementById("tBody2").appendChild(l)}}})}
