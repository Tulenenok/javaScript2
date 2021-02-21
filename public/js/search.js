Vue.component('search', {
    template: `<form action="#" class = "searchForm" @submit="$root.filterProducts($event)">
                    <input type="search" class="searchInput">
                    <i class="fa fa-search"></i>
                </form>`
})