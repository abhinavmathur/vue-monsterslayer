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
            this.turns = [];
        },
        attack: function () {
            this.playerAttacks();
            this.monsterAttacks();
            if (this.checkWin()) {
                return;
            }
        },

        specialAttack: function () {

            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.monsterAttacks();
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster HARD for '+ damage
            })
             if (this.checkWin()) {
                return;
            }
        },

        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10
                this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })
            } else {
                this.playerHealth = 100
            }
        },

        giveUp: function () {
            this.gameIsRunning = false
            this.monsterHealth = 0;
            this.playerHealth = 0;
            this.turns = [];
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        monsterAttacks: function () {
            monster_min = 8
            monster_max = 15

            var damage = this.calculateDamage(monster_min, monster_max);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for '+ damage
            })
        },

        playerAttacks: function () {
            var player_min = 3
            var player_max = 10

            var damage = this.calculateDamage(player_min, player_max);
            this.monsterHealth -= damage

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for '+ damage
            })
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