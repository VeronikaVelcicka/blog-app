import { defineStore } from "pinia";
import { HttpClient } from "@/common/http/http-client";
import { notify } from "@kyvg/vue3-notification";

export const useBlogsStore = defineStore("blogs", {
  state: () => {
    return {
      items: [],
      itemToEdit: null,
      tag: {},
      tagsReload: false,
    };
  },
  actions: {
    fetchAllItems() {
      return new Promise((resolve, reject) => {
        HttpClient.get(`/blog`)
          .then((response) => {
            this.items = response.data;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchItem(id) {
      return new Promise((resolve, reject) => {
        HttpClient.get(`/blog/${id}`)
          .then((response) => {
            const data = response.data;
            const indexOfItem = this.items.findIndex((item) => item.id === id);
            if (indexOfItem < 0) {
              this.items.push(data);
            } else {
              this.items[indexOfItem] = data;
            }
            this.itemToEdit = data;
            resolve(this.itemToEdit);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updateItem(id, data) {
      return new Promise((resolve, reject) => {
        HttpClient.put(`/blog/${id}`, data)
          .then((response) => {
            const data = response.data;
            this.itemToEdit = data;
            const indexOfItem = this.items.findIndex((item) => item.id === id);
            if (indexOfItem < 0) {
              this.items.push(data);
            } else {
              this.items[indexOfItem] = data;
            }
            notify({
              type: "success",
              text: "Post byl aktualizován.",
            });
            resolve(this.itemToEdit);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    createItem(data) {
      return new Promise((resolve, reject) => {
        HttpClient.post(`/blog`, data)
          .then((response) => {
            const data = response.data;
            this.items.push(data);
            notify({
              type: "success",
              text: "Post byl vytvořen.",
            });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    searchByTag() {
      return new Promise((resolve, reject) => {
        HttpClient.get(`/blog/?tags=${this.tag.id}`)
          .then((response) => {
            this.items = response.data;
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    addTag(blogId, tagId) {
      return new Promise((resolve, reject) => {
        HttpClient.put(`/blog/${blogId}/add_tag/${tagId}`, {
          id: blogId,
          tag_pk: tagId,
        })
          .then((response) => {
            const data = response.data;
            this.itemToEdit = data;
            const indexOfItem = this.items.findIndex(
              (item) => item.id === blogId
            );
            if (indexOfItem < 0) {
              this.items.push(data);
            } else {
              this.items[indexOfItem] = data;
            }
            notify({
              type: "success",
              text: "Tag byl přidán.",
            });
            resolve(this.itemToEdit);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
