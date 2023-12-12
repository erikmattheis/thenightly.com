<template>
  <div>
    <div class="filters" @click.prevent="toggleCollapse('filters')">
      Code
    </div>
    <div class="code filter">
      <code>
            <div>
      <JSONEditor bind:content />
    </div>
              </code>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopFilter',
  data() {
    return {
      content: {
        json: filters,
      },
    };
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.content.text = this.filters;
  },
  methods: {
    toggleCollapse(name) {
      const element = document.querySelector(`.${name}.filter`);
      element.classList.toggle('collapsed');

      const button = document.querySelector(`.${name}.collapse-button`);
      button.classList.toggle('down');

      const container = document.querySelector(`.${name}.list`);
      container.classList.toggle('hidden');
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #eee;
  cursor: pointer;
}

.collapse-button {
  margin-right: 8px;
  transition: transform 0.3s ease-in-out;
  align-self: flex-end;
}

.hidden {
  opacity: 0;
}

.down {
  transform: rotate(90deg);
}

.filter {
  transition: all 0.4s ease-out;
  height: auto;
  overflow: hidden;
}

.collapsed {
  height: 0;
}
</style>
