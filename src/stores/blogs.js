import { defineStore } from "pinia";
import { HttpClient } from "@/common/http/http-client";

export const useBlogsStore = defineStore("blogs", {
  state: () => {
    return {
      items: [],
      itemToEdit: null,
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
            resolve(this.itemToEdit);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    createItem(id, data) {
      return new Promise((resolve, reject) => {
        HttpClient.post(`/blog/${id}`, data)
          .then((response) => {
            const data = response.data;
            this.items.push(data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
