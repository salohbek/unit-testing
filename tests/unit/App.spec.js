import { expect } from 'chai';
import App from '@/App'
import {shallowMount} from '@vue/test-utils'

describe('App.vue', () => {

  let wrapper = shallowMount(App)
  beforeEach(()=>{
    wrapper = shallowMount(App)
  })
  it('should set correct default data', ()=>{
    expect(wrapper.vm.item).to.equal('')
    expect(wrapper.vm.items).to.deep.equal([])
  })
  it('should render correct contents', ()=>{
    expect(wrapper.html()).to.contain('<th>Items</th>')
  })
  it('should run this dummy test', ()=>{
    expect('Dummy'+' Test!').to.equal('Dummy Test!')
  })
  it('should run this dummy test', ()=>{
    const addItemButton = wrapper.find('.ui.button')
    expect(addItemButton.element.disabled).to.be.true
  })
  describe('the user population the text input field' , ()=>{
   let inputField
   beforeEach(async()=>{
     inputField = wrapper.find('input')
     inputField.element.value = "New Item"
     inputField.trigger('input')
   })
    it('any text',()=>{
   expect(wrapper.vm.item).to.equal('New Item')
    })
 
  describe('and then clears the input' , ()=>{
     it('any text',async()=>{
       const addItemButton = wrapper.find('.ui.button')
       inputField.element.value = ""
       await inputField.trigger('input')
    expect(addItemButton.element.disabled).to.be.true
     })
   })
   describe('and then submits the form',()=>{
      let addItemButton
      beforeEach(async()=>{
        wrapper.setData({item: 'New Item'})
        addItemButton = wrapper.find('.ui.button')
        await addItemButton.trigger('submit')
      })
      it('any text',async()=>{
        const itemList = wrapper.find('.item-list')
        expect(wrapper.vm.items).to.contain('New Item')
        expect(itemList.html()).to.contain('<td>New Item</td>')
      })
      it('any text',async()=>{
        const inputField = wrapper.find('input')
        expect(wrapper.vm.item).to.equal('')
        expect(inputField.element.value).to.equal('')
      })
      it('any text',async()=>{
        expect(addItemButton.element.disabled).to.be.true
      })
   })
  })
  describe('any Text',()=>{
    let itemList
    let removeItemsAll
    beforeEach(()=>{
      itemList = wrapper.find('.item-list')
      removeItemsAll = wrapper.find('.ui.label')
      wrapper.setData({items:["Item #1","Item #2","Item #3"]})
    })
    it('any text',async()=>{
      await removeItemsAll.trigger('click')
      expect(itemList.html()).to.not.contain('<td>Item #1</td>')
      expect(itemList.html()).to.not.contain('<td>Item #2</td>')
      expect(itemList.html()).to.not.contain('<td>Item #3</td>')
    })
  })
})
