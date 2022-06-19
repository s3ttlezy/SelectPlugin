const getTemplate = (data = [], placeholder = 'Select something', selectedId) => {
  const items = data.map(item => {
    let cls = ""
    if (item.id === selectedId) {
      placeholder = item.value
      cls = "selected"
    }
    return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}" data-value="${item.value}">${item.value}</li>`
  })

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${placeholder}</span>
      <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join("")}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options

    this.$el.classList.add("select")
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener("click", this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset
    if (type === 'input') {
      this.toggle()
    } else if (type === "item") {
      const id = event.target.dataset.id
      const value = event.target.dataset.value
      this.select(id, value)
    } else if (type === "backdrop") {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open")
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id, value) {
    this.selectedId = id
    this.selectedValue = value
    this.$value.textContent = this.selectedValue

    this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => {
      el.classList.remove("selected")
    })
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected")

    this.options.onSelect ? this.options.onSelect(this.selectedId) : null

    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add("open")
    this.$arrow.style.transform = "rotate(180deg)"
  }

  close() {
    this.$el.classList.remove("open")
    this.$arrow.style.transform = "rotate(0deg)"
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler)
    this.$el.outerHTML = ""
  }
}