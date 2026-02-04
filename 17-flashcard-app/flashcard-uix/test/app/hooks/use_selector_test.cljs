(ns app.hooks.use-selector-test
  (:require [app.hooks.use-selector :refer [use-selector]]
            [cljs.test :refer [are deftest is testing]]
            ["global-jsdom/register"]
            ["@testing-library/react" :refer [renderHook]]))

(deftest test-use-selector

  (testing "adding cards"
    (let [container (renderHook use-selector #js{:initialProps 0})
          result (.-result container)]
      (is (= -1 (:selected-index (.-current result))))
      (.rerender container 3)
      (is (= 0 (:selected-index (.-current result))))))

  (testing "next"
    (let [container (renderHook #(use-selector 3))
          result (.-result container)
          next-index #(do ((:select-next (.-current result)))
                          (.rerender container)
                          (:selected-index (.-current result)))]
      (are [expected] (= expected (next-index))
        1
        2
        0
        1)))

  (testing "previous"
    (let [container (renderHook #(use-selector 3))
          result (.-result container)
          previous-index #(do ((:select-previous (.-current result)))
                              (.rerender container)
                              (:selected-index (.-current result)))]
      (are [expected] (= expected (previous-index))
        2
        1
        0
        2)))

  (testing "deleting cards"
    (let [container (renderHook use-selector #js{:initialProps 3})
          result (.-result container)
          {:keys [select-previous]} (.-current result)
          _ (select-previous)]
      (.rerender container 2)
      (is (= 1 (:selected-index (.-current result)))))))
