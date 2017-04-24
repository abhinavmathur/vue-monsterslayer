new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameIsRunning: false
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        },
        attack: function () {
            var player_min = 3
            var player_max = 10

            this.monsterHealth -= this.calculateDamage(player_min, player_max);

            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.checkWin();
        },

        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },

        heal: function () {

        },

        giveUp: function () {

        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        monsterAttacks: function () {
            monster_min = 5
            monster_max = 12

            this.playerHealth -= this.calculateDamage(monster_min, monster_max);
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                var conf = confirm('You won ! Want to play again ?')
                if (conf) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                var conf = confirm('You lost :( Want to play again ?')
                if (conf) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        }
    }
});