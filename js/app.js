new Vue({
    el: '#app',
    data: {
        isShowingCart: false,

        cart: {
            items: []
        },

        products: [
            {
                id: 1,
                name: 'The Smiths',
                img: 'https://img.discogs.com/EuGrdp1lqK_2NtuWkpkRaPdPPPw=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-494927-1230854023.jpeg.jpg',
                description: 'The Queen Is Dead',
                price: 14,
                inStock: 50
            },
            {
                id: 2,
                name: 'Sneaker Pimps',
                img: 'https://img.discogs.com/7gCwhQ2LiC3X5RgfBqnVNfaoREc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-96238-1466804014-1032.jpeg.jpg',
                description: 'Bloodsport',
                price: 17,
                inStock: 755
            },
            {
                id: 3,
                name: 'The Dandy Warhols',
                img: 'https://img.discogs.com/ZCrB5ABP_eTKgi6HT11137e5akc=/fit-in/600x607/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-482628-1430040290-6674.jpeg.jpg',
                description: 'Thirteen Tales From Urban Bohemia',
                price: 9,
                inStock: 5
            },
            {
                id: 4,
                name: 'The Fall',
                img: 'https://img.discogs.com/zRChmeWE7-jLnqpCUgQOdzypvZA=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-372000-1230023714.jpeg.jpg',
                description: 'Live At The Witch Trials',
                price: 11,
                inStock: 42
            },
            {
                id: 5,
                name: 'The Sisters Of Mercy',
                img: 'https://img.discogs.com/9FhiyjQ0a2bh5nTVS5AlvMk1C5M=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-852299-1459799842-5412.jpeg.jpg',
                description: 'First And Last And Always',
                price: 12,
                inStock: 0
            },
            {
                id: 6,
                name: 'Red Hot Chili Peppers',
                img: 'https://img.discogs.com/5r7soQNMGdEIoR2y7R7aEjY9J9c=/fit-in/600x603/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1119354-1514420236-9623.jpeg.jpg',
                description: 'Blood Sugar Sex Magik',
                price: 19,
                inStock: 81
            }
        ]
    },

    filters: {
        currency: function(value) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    },

    methods: {
        addProductToCart: function(product) {
            var cartItem = this.getCartItem(product);

            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        increaseQuantity: function(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity: function(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart: function(cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout: function() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        },

        getCartItem: function(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        }
    },

    computed: {
        cartTotal: function() {
            var total = 0;

            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },

        taxAmount: function() {
            return ((this.cartTotal * 10) / 100);
        }
    }
});