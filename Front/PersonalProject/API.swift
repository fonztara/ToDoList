//
//  APICalls.swift
//  PersonalProject
//
//  Created by Alfonso Tarallo on 23/01/24.
//

import Foundation


class API {
    
    let decoder = JSONDecoder()
    
    
    func addUser(name: String, email: String, password: String) async throws {
        print("FUNCTION")
        var urlComponents = URLComponents(string: "http://192.168.1.13:3001")
        let parameters: [String: Any] = ["name": name, "email": email, "password": password]
        urlComponents?.path = "/signup"
        let url = urlComponents?.url
        var request = URLRequest(url: url!)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        request.httpMethod = "POST"
        let session = URLSession.shared
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted)
        } catch {
            print("Error JSONSerialization")
        }
        
        let task = session.dataTask(with: request) {data, response, error in
            if let error = error {
                print("error session", error)
            } else if let data = data {
                print("data", "\(data)")
            }
        }
        
        task.resume()
    }
    
}
