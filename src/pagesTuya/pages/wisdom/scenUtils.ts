import { gotoServeSwiper } from "@/routes/care-routes"
import { gotoKnowledge, gotoCareAlbum } from "@/routes/wisdom-routes"
import { gotoAgency } from '@/routes/user-routes'

export const scenList = [
    /* { id: 1, name: '场景管理', img: '/shop/newshop/singliList_2_1.png' },
    { id: 2, name: '设备管理', img: '/shop/newshop/singliList_2_2.png' },
    { id: 3, name: '场景服务', img: '/shop/newshop/singliList_2_3.png' },
    { id: 4, name: '探护云记', img: '/shop/newshop/singliList_2_4.png' },
    { id: 5, name: '康护助手', img: '/shop/newshop/singliList_2_5.png' }, */

    { id: 6, name: '找护⼯', img: '/shop/newshop/singliList_2_6.png' },
    { id: 7, name: '找家政', img: '/shop/newshop/singliList_2_7.png' },
    { id: 8, name: '去陪诊', img: '/shop/newshop/singliList_2_8.png' },
    { id: 9, name: '找养⽼院', img: '/shop/newshop/singliList_2_9.png' }, //找机构
    { id: 10, name: '找健康机构', img: '/shop/newshop/singliList_2_10.png' }, //到店服务
    { id: 11, name: '康护知识', img: '/shop/newshop/singliList_2_11.png' },
    { id: 12, name: '探护云记', img: '/shop/newshop/singliList_2_12.png' },
    { id: 13, name: '在线问诊', img: '/shop/newshop/singliList_2_13.png' }

]

export const linkNurse = (item: any) => {
    // gotoServeSwiper(this.city.id, item.typeId, item.activity_id, item.colnum, item.title, item.hotTag)
    const cityId = 440100
    console.log(item)
    if (item.id === 6) {
        gotoServeSwiper(cityId, 11, 3, 5, "居家照护", null)
        return false
    }
    if (item.id === 7) {
        gotoServeSwiper(cityId, 16, 7, 5, "家政", null)
        return false
    }
    if (item.id === 8) {
        gotoServeSwiper(cityId, 12, 4, 5, "陪诊", null)
        return false
    }
    if (item.id === 9) {
        // 找养⽼院
        /* uni.reLaunch({
            url: `/pages/daybreak/daybreak?tabids=8&typeIds=0`
        }) */
        //找机构
        uni.navigateTo({
            url: `/Channel/pages/orderConfirm/choiceHospital?templateId=122`
        })
        return false
    }
    if (item.id === 10) {
        // 健康机构
        /* uni.reLaunch({
            url: `/pages/daybreak/daybreak?tabids=8&typeIds=1`
        }) */
        //到店服务
        gotoAgency({})
        return false
    }
    if (item.id === 11) {
        gotoKnowledge()
        return false
    }
    // if (item.id === 12) {
    //     // 探护云记
    //     gotoCareAlbum()
    //     return false
    // }
    uni.showToast({
        title: "敬请期待",
        icon: "none"
    })
}
