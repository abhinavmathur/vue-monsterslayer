new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        },
        attack: function () {
            this.playerAttacks();
            this.monsterAttacks();
            if (this.checkWin()) {
                return;
            }
        },

        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },

        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10
            } else {
                this.playerHealth = 100
            }
        },

        giveUp: function () {
            this.gameIsRunning = false
            this.monsterHealth = 0;
            this.playerHealth = 0;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        monsterAttacks: function () {
            monster_min = 8
            monster_max = 15

            this.playerHealth -= this.calculateDamage(monster_min, monster_max);
        },

        playerAttacks: function () {
            var player_min = 3
            var player_max = 10

            this.monsterHealth -= this.calculateDamage(player_min, player_max);
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                var conf = confirm('You won ! Want to play again ?')
                if (conf) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                    this.monsterHealth = 0;
                }
                return true
            } else if (this.playerHealth <= 0) {
                var conf = confirm('You lost :( Want to play again ?')
                if (conf) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                    this.playerHealth = 0;
                }
                return true
            }
            return false
        }
    }
});