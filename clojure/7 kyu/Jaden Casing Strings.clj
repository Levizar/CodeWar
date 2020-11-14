;; third refactor
(ns jaden-case 
  (:require [clojure.string :as string]))

(ns jaden-case)

(defn jaden-case [s]
  (->> (string/split s #" ")
       (map string/capitalize)
       (string/join " "))
  )


;; second refactor
;; (ns jaden-case 
;;   (:require [clojure.string :as string]))

;; (defn jaden-case [str] 
;;   (string/join " " 
;;                (map string/capitalize 
;;                     (string/split str #" ")
;;                     )
;;                )
;;   )

;; first refactor
;;
;; (ns jaden-case)
;; (require '[clojure.string :as string])

;; (defn jaden-case [str]
;;   (string/join " "
;;                        (map string/capitalize 
;;                             (string/split str #" ")
;;                             )
;;                        )
;;   )




;; first solution
;; 
;; (ns jaden-case)

;; (defn jaden-case [str]
;;   (clojure.string/join " "
;;                        (map clojure.string/capitalize 
;;                             (clojure.string/split str #" ")
;;                             )
;;                        )
;;   )