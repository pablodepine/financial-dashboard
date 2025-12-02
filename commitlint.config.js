export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação, sem mudança de código
        'refactor', // Refatoração de código
        'perf', // Melhoria de performance
        'test', // Adição/correção de testes
        'build', // Mudanças no build ou dependências
        'ci', // Mudanças em CI/CD
        'chore', // Tarefas de manutenção
        'revert', // Reversão de commit
      ],
    ],
  },
};
