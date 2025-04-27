
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { token, guildId } = process.env;

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'podanie') {
    const modal = {
      title: 'Podanie o rolę',
      custom_id: 'podanie_modal',
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: 'wybor_podania',
              placeholder: 'Wybierz rolę',
              options: [
                { label: 'Bębniarz', value: 'bębniarz' },
                { label: 'Gniazdowy', value: 'gniazdowy' },
              ],
            },
          ],
        },
      ],
    };
    await interaction.showModal(modal);
  }
});

client.on('modalSubmit', async (interaction) => {
  if (interaction.customId === 'podanie_modal') {
    const role = interaction.fields.getTextInputValue('wybor_podania');
    const embed = {
      title: 'Podanie zostało złożone!',
      fields: [
        { name: 'Wybrana rola:', value: role },
      ],
      color: 0x00ff00,
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
    
    // Dodanie reakcji
    await interaction.message.react('✅');
    await interaction.message.react('❌');
  }
});

client.login(token);
    