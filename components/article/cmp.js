// 文章组件
import {LikeModel} from "../../models/like.js"

const likeModel = new LikeModel();

Component({
  properties: {
    articleDetail: Object
  },

  data: {
    likeStatus: false // 喜欢与否
  },

  attached() {
    this.getLikeStatus();
    const articleDetail = this.data.articleDetail;
    const artId = articleDetail.artId;

    const likeStatus = likeModel.getLikeStatus(artId);

    this.setData({
      likeStatus
    })
  },

  methods: {

    // 点击收藏按钮触发事件
    onLike(e) {
      const like = e.detail.like;
      const articleDetail = this.data.articleDetail
      const artId = articleDetail.artId
      if(like) {
        // 将文章缓存进
        likeModel.addLikeList(articleDetail)
      } else {
        // 将文章从缓存中移出
        likeModel.removeLikeList(artId)
      }

      this.resetPageInfo()
    },

    resetPageInfo() {
      const curPages =  getCurrentPages()[getCurrentPages().length - 1];
      if( curPages.route === "pages/mark/mark"){
        curPages.getMyLike()
      }
      this.getLikeStatus()
    },

    getLikeStatus() {
      const articleDetail = this.data.articleDetail
      const artId = articleDetail.artId
      const likeStatus =  likeModel.getLikeStatus(artId)

      this.setData({
        likeStatus
      })
    }

  }
})




