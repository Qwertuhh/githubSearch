"use strict";
// ! main file
const getUser = document.querySelector('#user');
const btn = document.querySelector("#btn");
const searchBox = document.querySelector("#searchBox");
const col_sm = document.querySelector(".col-sm");
const fetchApiFun = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Here is some error ${res.status}`);
    }
    else {
        return await res.json();
    }
};
// * display result
const showResultUI = (singleUser) => {
    if (singleUser) {
        const { avatar_url, login, url, location, id } = singleUser;
        col_sm.insertAdjacentHTML("beforeend", `<div class="card">
         <img src=${avatar_url} alt=${login}>
         <hr class="he">
         <div class="footer">
         <img class="icon" src=${avatar_url} alt=${login}>
         <a href=${url}>Github</a>
         </div>
        </div>`);
    }
};
// * default function
const fetchData = (url) => {
    fetchApiFun(url, {}).then((res) => {
        for (const user of res) {
            showResultUI(user);
        }
    });
};
fetchData("https://api.github.com/users");
// * seaarch fun
searchBox.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchOut = getUser.value.toLocaleLowerCase();
    try {
        const url = "https://api.github.com/users";
        const searchRes = await fetchApiFun(url, {});
        const matchUser = searchRes.filter((user) => {
            return user.login.includes(searchOut);
        });
        if (matchUser.length === 0) {
            col_sm.innerHTML = ``;
            col_sm.insertAdjacentHTML('beforeend', `<p class="msg">Nothing found</p>`);
        }
        else {
            col_sm.innerHTML = ``;
            for (const data of matchUser) {
                showResultUI(data);
            }
        }
    }
    catch (error) {
        console.log(new Error(`${error}`));
    }
});
