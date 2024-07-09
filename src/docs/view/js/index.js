document.addEventListener('DOMContentLoaded', async () => {
    const apiData = await getApiData()

    console.log(apiData);

    // 设置sidebar
    setSidebar(apiData.routeList)


    // 获取DocJson
    async function getApiData() {
        const fetchRes = await fetch('/apiDoc/getData')
        const data = await fetchRes.json()
        return data
    }

    // 设置sidebar
    function setSidebar(routeList) {
        // 设置sideHead
        Dom('.sideHead').innerText = apiData.title
        Dom('.sideDescription').innerText = apiData.description ?? null

        // 点击设置sideHead时返回首页
        Dom('.sideHead').addEventListener('click', goHome)

        Dom('.sideList').innerHTML = routeList.map(item => {
            return `
            <div class="sideItem">
                <div class="sideItemHead">
                    <div class="sideItemTitle singleLine" title="sideItem" data-route=${item.route}>${item.desc ?? item.route}</div>
                        <svg class="sideItemRightIcon" viewBox="0 0 1024 1024" width="1em" height="1em"><path d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496" fill="currentColor"></path></svg>
                </div>
                <div class="sideItemList">
                    ${item.apiList.map(item => `<div class="listItem singleLine" data-url=${item.url}>${item.desc ?? item.url}</div>`).join('')}
                </div>
            </div>
        `
        }).join('')

        // 点击listItem更新Main View
        Doms('.sideItem').forEach(item => {
            const [sideItemHead, sideItemList] = item.children
            const icon = sideItemHead.children[1]

            // 为sideList添加展开效果
            sideItemHead.addEventListener('click', () => {
                if (!sideItemList.classList.contains('listShow')) {
                    icon.classList.add('reverse')
                    sideItemList.classList.add('listShow')
                } else {
                    icon.classList.remove('reverse')
                    sideItemList.classList.remove('listShow')
                }
            })

            // 点击listItem更新Main View
            for (let i = 0; i < sideItemList.children.length; i++) {
                const listItem = sideItemList.children[i];
                listItem.addEventListener('click', () => {
                    Dom('.mainContent').style.display = 'block'
                    Dom('.homeContent').style.display = 'none'

                    const route = sideItemHead.children[0].dataset.route
                    const url = listItem.dataset.url

                    const currentApi = routeList.find(item => item.route === route).apiList.find(item => item.url === url)

                    updataMain(currentApi)
                })
            }
        })
    }

    // 更新Main View
    function updataMain(apiInfo) {
        Dom('.mainHeadTitle').innerText = `${apiInfo.type} - ${apiInfo.url}`
        Dom('.titleRight').innerText = `${apiData.serve}`
        Dom('.description').innerText = apiInfo.description ?? null

        Dom('.codeOneText').innerHTML = apiInfo.request.map(item => `<div> ${item.required ? '*' : ''}${item.key}:${item.type};</div> `).join('')
        Dom('.codeTwoText').innerHTML = apiInfo.responses.map(item => `<div> ${item.required ? '*' : ''}${item.key}:${item.type};</div> `).join('')
    }

    function goHome() {
        Dom('.mainHeadTitle').innerText = `${apiData.serve} `
        Dom('.titleRight').innerText = `V: ${apiData.version} `
        Dom('.mainContent').style.display = 'none'
        Dom('.homeContent').style.display = 'flex'
    }
    goHome()
})