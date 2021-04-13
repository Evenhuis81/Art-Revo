<template>
    <div class="sidenav">
        <router-link v-for="crud in cruds" :key="crud.name" to="/">{{ crud.name }}</router-link>
    </div>
</template>

<script>
export default {
    setup() {
        const cruds = [
            {
                name: 'Creëren',
                //
            },
            {
                name: 'Tonen',
            },
            {
                name: 'Bijwerken',
            },
            {
                name: 'Verwijderen',
            }
        ]

        return { cruds }
    }
}
</script>

<style scoped>
.sidenav {
  width: 170px;
  position: fixed;
  z-index: 1;
  top: 120px;
  left: 10px;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 0;
  border-right: 1px solid black;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #2196F3;
  display: block;
}

.sidenav a:hover {
  color: #064579;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
