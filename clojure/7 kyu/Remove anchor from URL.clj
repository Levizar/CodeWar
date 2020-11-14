(ns kata (clojure.string/replace :as replace) 
    )

(defn remove-url-anchor [url]
  (replace url #"#.*" "")
  )