import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "Что обозначает аббревиатура HTML?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink Text Management Logic",
    ],
    correct: 0,
  },
  {
    question: "Какое устройство является «мозгом» компьютера?",
    options: ["Видеокарта", "Процессор (CPU)", "Жёсткий диск", "Блок питания"],
    correct: 1,
  },
  {
    question: "Что такое алгоритм?",
    options: [
      "Тип компьютерного вируса",
      "Программа для рисования",
      "Чёткая последовательность действий для решения задачи",
      "Устройство ввода",
    ],
    correct: 2,
  },
  {
    question: "Какой язык программирования чаще всего используют для веб-фронтенда?",
    options: ["Python", "C++", "JavaScript", "Swift"],
    correct: 2,
  },
  {
    question: "Что измеряется в байтах?",
    options: ["Скорость процессора", "Объём информации", "Напряжение", "Частота экрана"],
    correct: 1,
  },
  {
    question: "Что такое IP-адрес?",
    options: [
      "Имя пользователя",
      "Пароль от Wi-Fi",
      "Уникальный сетевой адрес устройства",
      "Тип файла",
    ],
    correct: 2,
  },
  {
    question: "Что делает оперативная память (RAM)?",
    options: [
      "Хранит данные навсегда",
      "Временно хранит данные работающих программ",
      "Охлаждает процессор",
      "Подключает интернет",
    ],
    correct: 1,
  },
  {
    question: "Что такое искусственный интеллект (ИИ)?",
    options: [
      "Любая компьютерная программа",
      "Системы, способные обучаться и решать задачи, имитируя мышление",
      "Робот-пылесос",
      "Тип монитора",
    ],
    correct: 1,
  },
  {
    question: "Какой протокол используется для безопасной передачи данных в браузере?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
  },
  {
    question: "Что такое облачное хранилище?",
    options: [
      "Флешка большого объёма",
      "Хранение данных на удалённых серверах через интернет",
      "Папка на рабочем столе",
      "Резервная батарея",
    ],
    correct: 1,
  },
  {
    question: "Что такое база данных?",
    options: [
      "Список друзей в соцсети",
      "Организованное хранилище структурированной информации",
      "Антивирусная программа",
      "Графический редактор",
    ],
    correct: 1,
  },
  {
    question: "Что такое API?",
    options: [
      "Интерфейс для взаимодействия программ между собой",
      "Тип процессора",
      "Язык разметки",
      "Антивирус",
    ],
    correct: 0,
  },
  {
    question: "Какое устройство является периферийным?",
    options: ["Материнская плата", "Принтер", "Процессор", "Оперативная память"],
    correct: 1,
  },
  {
    question: "Что такое баг в программировании?",
    options: ["Новая функция", "Ошибка в программе", "Тип файла", "Антивирус"],
    correct: 1,
  },
  {
    question: "Что означает термин «open source»?",
    options: [
      "Платная программа",
      "Программа с открытым исходным кодом",
      "Закрытая сеть",
      "Тип шифрования",
    ],
    correct: 1,
  },
  {
    question: "Что такое VPN?",
    options: [
      "Вирусная программа",
      "Технология защищённого подключения к сети",
      "Тип монитора",
      "Игровая консоль",
    ],
    correct: 1,
  },
  {
    question: "Что такое машинное обучение?",
    options: [
      "Обучение людей работе на компьютере",
      "Метод, при котором алгоритмы учатся на данных",
      "Ремонт техники",
      "Тип клавиатуры",
    ],
    correct: 1,
  },
  {
    question: "Что обозначает «GUI»?",
    options: [
      "Графический интерфейс пользователя",
      "Главный игровой узел",
      "Глобальный интернет-узел",
      "Группа уникальных идентификаторов",
    ],
    correct: 0,
  },
  {
    question: "Что делает компилятор?",
    options: [
      "Удаляет вирусы",
      "Преобразует исходный код в машинный",
      "Подключает интернет",
      "Хранит файлы",
    ],
    correct: 1,
  },
  {
    question: "Что такое кэш?",
    options: [
      "Денежная единица",
      "Промежуточное хранилище для быстрого доступа к данным",
      "Тип вируса",
      "Сетевой кабель",
    ],
    correct: 1,
  },
];

const PASS_SCORE = 12;

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const passed = score >= PASS_SCORE;
  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <section
      id="quiz"
      className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 py-20"
    >
      <div className="w-full max-w-3xl">
        {!finished ? (
          <>
            <div className="flex items-center justify-between mb-6 text-sm uppercase tracking-wide text-neutral-400">
              <span>
                Вопрос {current + 1} / {questions.length}
              </span>
              <span>Правильно: {score}</span>
            </div>

            <div className="h-1 w-full bg-neutral-800 rounded-full mb-12 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold mb-10 leading-tight">
                  {questions[current].question}
                </h2>

                <div className="flex flex-col gap-3">
                  {questions[current].options.map((option, i) => {
                    const isCorrect = i === questions[current].correct;
                    const isSelected = i === selected;
                    let style =
                      "border-neutral-700 hover:border-white hover:bg-neutral-900";
                    if (answered) {
                      if (isCorrect) {
                        style = "border-green-500 bg-green-500/10 text-green-300";
                      } else if (isSelected) {
                        style = "border-red-500 bg-red-500/10 text-red-300";
                      } else {
                        style = "border-neutral-800 opacity-50";
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={answered}
                        className={`flex items-center justify-between text-left border px-6 py-4 rounded-lg transition-all duration-300 ${style}`}
                      >
                        <span className="text-base md:text-lg">{option}</span>
                        {answered && isCorrect && (
                          <Icon name="Check" size={22} className="text-green-400 shrink-0" />
                        )}
                        {answered && isSelected && !isCorrect && (
                          <Icon name="X" size={22} className="text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleNext}
                    className="mt-10 bg-white text-black px-8 py-3 text-sm uppercase tracking-wide border border-white transition-all duration-300 hover:bg-transparent hover:text-white"
                  >
                    {current + 1 < questions.length ? "Следующий вопрос" : "Показать результат"}
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Icon
              name={passed ? "Trophy" : "RotateCcw"}
              size={64}
              className={`mx-auto mb-8 ${passed ? "text-yellow-400" : "text-neutral-400"}`}
            />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {passed ? "Зачёт сдан!" : "Зачёт не сдан"}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 mb-2">
              Ваш результат: {score} из {questions.length}
            </p>
            <p className="text-neutral-500 mb-10">
              {passed
                ? "Отличная работа! Вы хорошо разбираетесь в технологиях."
                : `Для зачёта нужно набрать минимум ${PASS_SCORE} баллов. Попробуйте ещё раз!`}
            </p>
            <button
              onClick={restart}
              className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wide border border-white transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              Пройти заново
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
